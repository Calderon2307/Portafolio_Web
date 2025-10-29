import { useState } from 'react';
import helpIcon from '@assets/icons/help.png';
import soundOnIcon from '@assets/icons/soundOn.png';
import soundOffIcon from '@assets/icons/soundOff.png';
import style from '@components/Footer/Footer.module.css';

const Footer = (): JSX.Element => {
  const [activeSound, setActiveSouond] = useState<boolean>(true);

  const handleSound = () => {
    setActiveSouond(!activeSound);
  };

  return (
    <footer className={`${style.footer}`}>
      <button className={`${style.button}`}>
        <img src={helpIcon} alt="help icon" className={`${style.img}`} />
      </button>
      <button className={`${style.button}`} onClick={handleSound}>
        <img
          src={activeSound ? soundOnIcon  : soundOffIcon }
          alt="sound icon"
          className={`${style.img}`}
        />
      </button>
    </footer>
  );
};

export default Footer;
