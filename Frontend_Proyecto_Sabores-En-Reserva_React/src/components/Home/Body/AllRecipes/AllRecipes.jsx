import style from './AllRecipes.module.css';
import Title from './Title/Title';
import RecipesContainer from './RecipesContainer/RecipesContainer';
import LoadRecipesButton from './LoadRecipesButton/LoadRecipesButton';

const AllRecipes = ({ user }) => {

    return (

        <section className={`${style.section}`}>
            <Title />
            <RecipesContainer user={user} />
            <LoadRecipesButton />
        </section>
    );
};

export default AllRecipes;