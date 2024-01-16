import style from './Recipes.module.css';
import Card from '@/components/Home/Body/FeaturedRecipes/Card/Card';

const Recipes = ({ user }) => {

    return (
        <section className={`${style.section}`}>
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
            <Card user={user} />
        </section>
    );
};

export default Recipes;