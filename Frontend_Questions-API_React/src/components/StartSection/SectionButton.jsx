import Button from './ButtonStart/Button';
import style from './SectionButton.module.css';

const SectionButton = ({ onQuestion }) => {
    return(
        <section className={`${style.btnContainer}`}>
            <Button onQuestion={onQuestion}/>
        </section>
    );
};

export default SectionButton;