import style from '@components/Footer/Footer.module.css';
import { useState } from 'react';

const Footer = (): JSX.Element => {
  const [activeSound, setActiveSouond] = useState<boolean>(true);

  const handleSound = () => {
    setActiveSouond(!activeSound);
  };

  return (
    <footer className={`${style.footer}`}>
      <button className={`${style.button}`}>
        <img
          src="/src/assets/icons/help.png"
          alt="help icon"
          className={`${style.img}`}
        />
      </button>
      <button className={`${style.button}`} onClick={handleSound}>
        <img
          src={
            activeSound
              ? '/src/assets/icons/soundOn.png'
              : '/src/assets/icons/soundOff.png'
          }
          alt="sound icon"
          className={`${style.img}`}
        />
      </button>
    </footer>
  );
};

export default Footer;
