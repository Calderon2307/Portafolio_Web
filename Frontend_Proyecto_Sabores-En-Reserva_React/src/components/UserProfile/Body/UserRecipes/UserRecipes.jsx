import style from './UserRecipes.module.css';
import UserCreatedRecipes from './UserCreatedRecipes/UserCreatdRecipes';
import UserSavedRecipes from './UserSavedRecipes/UserSavedRecipes';

const UserRecipes = ({ user }) => {

    return (
        <section className={`${style.section}`}>
            <UserSavedRecipes user={user} />
            <UserCreatedRecipes user={user} />
        </section>
    );
};

export default UserRecipes;