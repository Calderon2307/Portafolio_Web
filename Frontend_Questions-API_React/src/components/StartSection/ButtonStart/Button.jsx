import style from './Button.module.css';

const Button = ({ onQuestion }) => {

    return(
        <button 
        className={`${style.btn}`}
        onClick={onQuestion}
        >OBTENER PREGUNTAS</button>
    );
};

export default Button;