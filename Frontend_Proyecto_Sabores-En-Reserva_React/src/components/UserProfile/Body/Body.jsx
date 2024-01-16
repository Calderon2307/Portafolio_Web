import style from './Body.module.css';
import UserInfo from './UserInfo/UserInfo';
import UserRecipes from './UserRecipes/UserRecipes';
import UserCupboard from './UserCupboard/UserCupboard';

const Body = ({ user }) => {

    return (
        <main className={`${style.main}`}>
            <UserInfo />
            <UserRecipes user={user} />
            <UserCupboard />
        </main>
    );
};

export default Body;