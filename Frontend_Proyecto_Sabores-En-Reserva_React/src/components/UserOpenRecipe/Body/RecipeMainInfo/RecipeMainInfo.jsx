import style from './RecipeMainInfo.module.css';
import RecipeImg from './RecipeImg/RecipeImg';
import RecipeStats from './RecipeStats/RecipeStats';

const RecipeMainInfo = () => {

    return (
        <section className={`${style.section}`}>
            <RecipeImg />
            <RecipeStats />
        </section>
    );
};

export default RecipeMainInfo;