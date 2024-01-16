import Card from '../../FeaturedRecipes/Card/Card';
import style from './RecipesContainer.module.css';

const RecipesContainer = ({ user }) => {

    return (
        <div className={`${style.cardsContainer}`}>
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
        </div>
    );
};

export default RecipesContainer;