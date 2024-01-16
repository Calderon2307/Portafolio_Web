import { ErrorMessage, Field, Form, Formik } from 'formik';
import style from './Body.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Body = () => {

    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const onSubmit = ({ resetForm }) => {
        navigate('/user-home');
        resetForm();
    };

    const validate = (values) => {
        const errors = {};

        if (values.userImg) {
            const allowedExtensions = ['jpg', 'jpeg', 'png']; // Puedes ampliar esta lista según tus necesidades
            const fileExtension = values.userImg.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                errors.userImg = 'Formato de archivo no permitido. Solo se permiten archivos JPG, JPEG o PNG';
            }
        }

        let trimmedName = '';

        if (values.userName) trimmedName = values.userName.trim();

        if (!values.userName) {
            errors.userName = 'Campo obligatorio';
        } else if (!/^[a-zA-Z\s]+$/.test(values.userName)) {
            errors.userName = 'El nombre solo puede contener letras y espacios';
        } else if (trimmedName.length < 3 || trimmedName.length > 50) {
            errors.userName = 'El nombre debe tener entre 3 y 50 caracteres';
        } else {
            const forbiddenNames = [
                'admin', 'root', 'user', 'commit', 'drop', 'delete', 'update', 'insert',
                'select', 'from', 'all', 'pene', 'vagina', 'verga', 'pito', 'mierda',
                'pendejo', 'culero', 'pendeja', 'culera', 'culo', 'trasero', 'ano',
                'puta', 'puto', 'ramera', 'prostituta', 'negro', 'negra', 'perra',
                'perro', 'cerote', 'cerota',
            ];

            if (forbiddenNames.some(forbidden => values.userName.toLowerCase().includes(forbidden))) {
                errors.userName = 'Nombre no permitido';
            }
        }

        if (!values.userEmail) {
            errors.userEmail = 'Campo obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.userEmail)) {
            errors.userEmail = 'Dirección de correo electrónico inválida';
        }

        if (!values.userPassword) {
            errors.userPassword = 'Campo obligatorio';
        } else if (values.userPassword.length < 8) {
            errors.userPassword = 'La contraseña debe tener al menos 8 caracteres';
        }

        if (!values.userRepeatPassword) {
            errors.userRepeatPassword = 'Campo obligatorio';
        } else if (values.userRepeatPassword !== values.userPassword) {
            errors.userRepeatPassword = 'Las contraseñas no coinciden';
        }

        return errors;
    };

    return (

        <main className={`${style.main}`}>
            <h2 className={`${style.title}`}>Editar Informacion</h2>
            <Formik
                initialValues={{
                    userImg: '',
                    userName: '',
                    userEmail: '',
                    userPassword: '',
                    userRepeatPassword: '',
                }}

                onSubmit={onSubmit}

                validate={validate}
            >
                <Form className={`${style.form}`}>
                    <div className={`${style.imgContainer}`}>
                        <label htmlFor='userImg' className={`${style.label} ${style.labelImg}`}>Imagen de Perfil</label>
                        <div className={`${style.imgUser}`} onClick={() => document.getElementById('userImg').click()} title='Agregar imagen de perfil'>
                            {selectedImage ? (
                                <img className={`${style.img}`} src={selectedImage} alt='Perfil' />
                            ) : (
                                <img className={`${style.img}`} src='src/assets/userDefault.png' alt='Default' />
                            )}
                        </div>
                        <Field
                            type='file'
                            id='userImg'
                            name='userImg'
                            onChange={handleImageChange}
                            className={`${style.input} ${style.inputUserImg}`}
                        />
                        <ErrorMessage name='userImg' component='div' className={`${style.errorImg}`} />
                    </div>
                    <div className={`${style.infoContainer}`}>
                        <div className={`${style.wrapper}`}>
                            <label htmlFor='userName' className={`${style.label}`}>
                                Nombre
                            </label>
                            <Field
                                type='text'
                                id='userName'
                                name='userName'
                                className={`${style.input} ${style.inputUserName}`}
                            />
                            <ErrorMessage name='userName' component='div' className={`${style.error}`} />
                        </div>
                        <div className={`${style.wrapper}`}>
                            <label htmlFor='userEmail' className={`${style.label}`}>
                                Correo
                            </label>
                            <Field
                                type='email'
                                id='userEmail'
                                name='userEmail'
                                className={`${style.input} ${style.inputUserEmail}`}
                            />
                            <ErrorMessage name='userEmail' component='div' className={`${style.error}`} />
                        </div>
                        <div className={`${style.wrapper}`}>
                            <label htmlFor='userPassword' className={`${style.label}`}>
                                Contraseña
                            </label>
                            <Field
                                type='password'
                                id='userPassword'
                                name='userPassword'
                                className={`${style.input} ${style.inputUserPassword}`}
                            />
                            <ErrorMessage name='userPassword' component='div' className={`${style.error}`} />
                        </div>
                        <div className={`${style.wrapper}`}>
                            <label htmlFor='userRepeatPassword' className={`${style.label}`}>
                                Repetir Contraseña
                            </label>
                            <Field
                                type='password'
                                id='userRepeatPassword'
                                name='userRepeatPassword'
                                className={`${style.input} ${style.inputUserRepeatPassword}`}
                            />
                            <ErrorMessage name='userRepeatPassword' component='div' className={`${style.error}`} />
                        </div>
                    </div>
                    <div className={`${style.btnContainer}`}>
                        <button type='submit' className={`${style.button}`}>Guardar Cambios</button>
                    </div>
                </Form>
            </Formik>
        </main>
    );
};

export default Body;