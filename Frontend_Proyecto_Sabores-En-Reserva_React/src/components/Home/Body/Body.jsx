import style from './Body.module.css';
import IndexView from './IndexView/IndexView';
import FeaturedRecipes from './FeaturedRecipes/FeaturedRecipes';
import AllRecipes from './AllRecipes/AllRecipes';

const Body = ({ user }) => {

    return (
        <main className={`${style.main}`}>
            <IndexView user={user} />
            <FeaturedRecipes user={user} />
            <AllRecipes user={user} />
        </main>
    );
};

export default Body;