import Title from './Title/Title';
import FormContainer from './FormContainer/FormContainer';
import style from './Body.module.css';

const Body = () => {

    return (
        <main className={`${style.main}`}>
            <Title />
            <FormContainer />
        </main>
    );
};

export default Body;