import style from './UserInfo.module.css';
import UserImgProfile from './UserImgProfile/UserImgProfile';
import UserProfileInfo from './UserProfileInfo/UserProfileInfo';
import ActionButtons from './ActionButtons/ActionButtons';
import { useEffect, useState } from 'react';

const UserInfo = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (

        <section className={`${style.section}`}>
            <UserImgProfile />
            <UserProfileInfo />
            {windowWidth <= 873 ? <></> : <ActionButtons />}
        </section>
    );
};

export default UserInfo;