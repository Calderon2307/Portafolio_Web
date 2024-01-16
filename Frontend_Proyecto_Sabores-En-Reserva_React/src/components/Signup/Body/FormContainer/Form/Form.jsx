import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import style from './Form.module.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {

    const navigate = useNavigate();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const onSubmit = () => {
        navigate('/user-home');
    };

    const validate = (values) => {
        const errors = {};

        const trimmedName = values.name.trim();

        if (!values.name) {
            errors.name = 'Campo obligatorio';
        } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
            errors.name = 'El nombre solo puede contener letras y espacios';
        } else if (trimmedName.length < 3 || trimmedName.length > 50) {
            errors.name = 'El nombre debe tener entre 3 y 50 caracteres';
        } else {
            const forbiddenNames = [
                'admin', 'root', 'user', 'commit', 'drop', 'delete', 'update', 'insert',
                'select', 'from', 'all', 'pene', 'vagina', 'verga', 'pito', 'mierda',
                'pendejo', 'culero', 'pendeja', 'culera', 'culo', 'trasero', 'ano',
                'puta', 'puto', 'ramera', 'prostituta', 'negro', 'negra', 'perra',
                'perro', 'cerote', 'cerota',
            ];

            if (forbiddenNames.some(forbidden => values.name.toLowerCase().includes(forbidden))) {
                errors.name = 'Nombre no permitido';
            }
        }

        if (!values.email) {
            errors.email = 'Campo obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Dirección de correo electrónico inválida';
        }

        if (!values.password) {
            errors.password = 'Campo obligatorio';
        } else if (values.password.length < 8) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Campo obligatorio';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        return errors;
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: initialValues.name,
                    email: initialValues.email,
                    password: initialValues.password,
                    confirmPassword: initialValues.confirmPassword,
                }}

                onSubmit={onSubmit}

                validate={validate}

            >

                <FormikForm className={`${style.form}`}>

                    <div className={`${style.wrapper}`}>
                        <label htmlFor='nameSignup' className={`${style.label}`}>Nombre:</label>
                        <Field type='text' name='name' id='nameSignup' placeholder='John Doe' className={`${style.input}`} />
                        <ErrorMessage name='name' component='div' className={`${style.error}`} />
                    </div>

                    <div className={`${style.wrapper}`}>
                        <label htmlFor='emailSignup' className={`${style.label}`}>Correo:</label>
                        <Field type='email' name='email' id='emailSignup' placeholder='johndoe@example.com' className={`${style.input}`} />
                        <ErrorMessage name='email' component='div' className={`${style.error}`} />
                    </div>

                    <div className={`${style.wrapper}`}>
                        <label htmlFor='passSignup' className={`${style.label}`}>Contraseña:</label>
                        <Field type='password' name='password' id='passSignup' placeholder='*********' className={`${style.input}`} />
                        <ErrorMessage name='password' component='div' className={`${style.error}`} />
                    </div>

                    <div className={`${style.wrapper}`}>
                        <label htmlFor='passConfirmSignup' className={`${style.label}`}>Confirmar contraseña:</label>
                        <Field type='password' name='confirmPassword' id='passConfirmSignup' placeholder='*********' className={`${style.input}`} />
                        <ErrorMessage name='confirmPassword' component='div' className={`${style.error}`} />
                    </div>

                    <div className={`${style.wrapper}`}>
                        <button type='submit' className={`${style.btnSubmit}`}>Registrarse</button>
                    </div>

                </FormikForm>

            </Formik>
        </>
    );
};

export default Form;