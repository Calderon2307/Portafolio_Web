import style from './UserProfileInfo.module.css';

const UserProfileInfo = () => {

    return (

        <div className={`${style.userInfoContainer}`}>
            <div className={`${style.wrapper}`}>
                <p className={`${style.userName}`}>Username</p>
            </div>
            <div className={`${style.wrapper}`}>
                <div className={`${style.statContainier}`}>
                    <p className={`${style.statNumber}`}>##</p>
                    <p className={`${style.statName}`}>Recetas Publicadas</p>
                </div>
                <div className={`${style.statContainier}`}>
                    <p className={`${style.statNumber}`}>##</p>
                    <p className={`${style.statName}`}>Recetas Guardadas</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfileInfo;