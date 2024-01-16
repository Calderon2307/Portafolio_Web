import { NavLink } from 'react-router-dom';
import style from './UserInfo.module.css';

const UserInfo = () => {

    return (
        <NavLink to='/user-profile' className={`${style.infoContainer}`}>
            <div className={`${style.userImg}`}>
                <img className={`${style.img}`} src='src/assets/userDefault.png' alt='Default' />
            </div>
            <p className={`${style.userName}`}>Username</p>
        </NavLink>
    );
};

export default UserInfo;