import style from './FeaturedRecipes.module.css';
import Title from './Title/Title';
import Card from './Card/Card';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useState } from 'react';

const FeaturedRecipes = ({ user }) => {

    return (
        <section className={`${style.section}`}>
            <Title />
            <div className={`${style.sliderContanier}`}>
                {/* <MdNavigateBefore className={`${style.icon}`} onClick={handlePrevClick} /> */}
                <div className={`${style.cardsContainer}`} >
                    <Card user={user} />
                    <Card user={user} />
                    <Card user={user} />
                    <Card user={user} />
                    <Card user={user} />
                    <Card user={user} />
                    <Card user={user} />
                    <Card user={user} />
                </div>
                {/* <MdNavigateNext className={`${style.icon}`} onClick={handleNextClick} /> */}
            </div>
        </section>
    );
};

export default FeaturedRecipes;