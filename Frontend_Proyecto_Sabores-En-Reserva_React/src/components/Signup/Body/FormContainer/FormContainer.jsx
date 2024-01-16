import Form from './Form/Form';
import LogButton from './LogButton/LogButton';
import SocialSignup from './SocialSignup/SocialSignup';
import style from './FormContainer.module.css';

const FormContainer = () => {

    return (
        <section className={`${style.formContainer}`}>
            <Form />
            <LogButton />
            <SocialSignup />
        </section>
    );
};

export default FormContainer;