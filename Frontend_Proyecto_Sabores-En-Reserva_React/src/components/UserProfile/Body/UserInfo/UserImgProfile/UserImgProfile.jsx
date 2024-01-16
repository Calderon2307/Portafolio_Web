import style from './UserImgProfile.module.css';

const UserImgProfile = () => {

    return (

        <div className={`${style.container}`}>
            <div className={`${style.imgContainer}`}>
                <img className={`${style.img}`} src='src/assets/userDefault.png' alt='Default' />
            </div>
        </div>
    );
};

export default UserImgProfile;