import style from './UserSavedRecipes.module.css';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Card from '@/components/Home/Body/FeaturedRecipes/Card/Card';
import { NavLink } from 'react-router-dom';

const UserSavedRecipes = ({ user }) => {

    return (
        <section className={`${style.section}`}>
            <div className={`${style.container}`}>

                <div className={`${style.wrapper}`}>
                    <NavLink to='/user-saved-recipes' className={`${style.title}`}>
                        <h2>Recetas Guardadas</h2>
                    </NavLink>
                </div>
                <div className={`${style.wrapper}`}>
                    {/* <MdNavigateBefore className={`${style.icon}`} /> */}
                    <div className={`${style.recipesContainer}`}>
                        <Card user={user} />
                        <Card user={user} />
                        <Card user={user} />
                        <Card user={user} />
                        <Card user={user} />
                        <Card user={user} />
                        <Card user={user} />
                        <Card user={user} />
                    </div>
                    {/* <MdNavigateNext className={`${style.icon}`} /> */}
                </div>
            </div>
        </section>
    );
};

export default UserSavedRecipes;