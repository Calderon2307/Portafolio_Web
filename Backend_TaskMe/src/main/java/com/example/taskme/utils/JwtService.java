package com.example.taskme.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;
    private static final long EXPIRATION_MS = 1000 * 60 *60 * 24;

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(Map<String, Object> extraClaims, String subject) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<io.jsonwebtoken.Claims, T> resolver) {
        return resolver.apply(Jwts.parser()
                        .setSigningKey(getSignKey())
                        .build().parseClaimsJws(token)
                        .getBody()
        );
    }

    public boolean isTokenValid(String token, String username) {
        return extractUsername(token).equals(username) &&  !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }
}
