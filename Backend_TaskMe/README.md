[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/B1OtWnxS)



# TaskMe – API Backend (Spring Boot) 🚀

## Integrantes
| Nombre                                   | Carné      |
|------------------------------------------|------------|
| Diego Alejandro Montoya Ramírez          | **00087522** |
| Alexander Rafael Rogel Campos            | **00100922** |
| Federico Josué Calderón Durán            | **00215818** |
| Julio Alberto Rodríguez Valencia         | **00163922** |
| Allan Josue Lopez Escalante              | **00049222** |

![Java](https://img.shields.io/badge/Java-17%2B-orange?logo=java)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen?logo=springboot)

## 📑 Tabla de contenido
1. [📝 Descripción](#descripción)
2. [✨ Características](#características)
3. [📚 Documentación de la API](#documentación-de-la-api)
4. [📟 Ejemplos de uso](#ejemplos-de-uso)



---

## 📝 Descripción
**TaskMe** es la API que alimenta la plataforma de gestión de tareas y servicios  
entre **Clientes** y **Taskers**. Proporciona autenticación con **JWT** 🔒, control de acceso basado en roles y un catálogo de endpoints REST para operaciones CRUD de *trabajos previos*, tareas, ubicaciones y categorías.

---

## ✨ Características
- 🔒 Autenticación *stateless* con **JWT Bearer**  
- 💾 Spring Data JPA + PostgreSQL   
- 🐳 Docker 


## 📚 Documentación de la API
- http://localhost:8080/swagger-ui.html
- https://cruzrojajuventudss.atlassian.net/wiki/x/PQEB 

## 📟 Ejemplos de uso

# 🤖 Registro
curl -X POST https://taskme-wmou.onrender.com/taskme/api/registro \
  -H 'Content-Type: application/json' \
  -d '{ "correo": "user@foo.com", "password": "123456" }'

# 🔑 Login
TOKEN=$(curl -s -X POST https://taskme-wmou.onrender.com/taskme/api/auth/login \
  -d 'username=user@foo.com&password=123456' | jq -r .token)

# 📋 Llamada protegida
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/taskme/api/tasks
