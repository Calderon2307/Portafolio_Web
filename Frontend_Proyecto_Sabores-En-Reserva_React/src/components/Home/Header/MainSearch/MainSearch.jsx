import { ErrorMessage, Field, Form, Formik } from 'formik';
import style from './MainSearch.module.css';
import { CiSearch } from "react-icons/ci";
import { MdFilterList } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MainSearch = ({ setSearchTerm, user }) => {

    const navigate = useNavigate();
    const [ruta, setRuta] = useState('/search-recipe');

    const notWork = () => {
        alert(`Los filtros se agregaran en proximas actualizaciones`);
    };

    const onSubmit = (values, { resetForm }) => {

        setSearchTerm(values.busqueda);

        navigate(ruta);

        resetForm();
    };

    useEffect(() => {
        if (user) setRuta('/user-search-recipe');
    }, [user]);

    const validateForm = (values) => {
        const errors = {};

        if (!values.busqueda) {
            errors.busqueda = 'Busqueda invalida';
        } else if (values.busqueda.length < 3) {
            errors.busqueda = 'La búsqueda debe tener al menos 3 caracteres.';
        } else if (values.busqueda.length > 50) {
            errors.busqueda = 'La búsqueda no debe exceder los 50 caracteres.';
        }

        if (/[^a-zA-Z0-9\s]/.test(values.busqueda)) {
            errors.busqueda = 'No se permiten caracteres especiales.';
        }
        const forbiddenNames = [
            'admin', 'root', 'user', 'commit', 'drop', 'delete', 'update', 'insert',
            'select', 'from', 'all', 'pene', 'vagina', 'verga', 'pito', 'mierda',
            'pendejo', 'culero', 'pendeja', 'culera', 'culo', 'trasero', 'ano',
            'puta', 'puto', 'ramera', 'prostituta', 'caca', 'perra',
            'perro', 'cerote', 'cerota',
        ];

        if (forbiddenNames.some(forbidden => values.busqueda.toLowerCase().includes(forbidden))) {
            errors.busqueda = 'No busques eso';
        }

        return errors;
    };

    return (
        <div className={`${style.formContainer}`}>
            <Formik
                initialValues={{
                    busqueda: ''
                }}

                onSubmit={onSubmit}

                validate={validateForm}
            >
                <Form className={`${style.form}`}>
                    <Field type='search' id='busqueda' placeholder=' ' className={`${style.input}`} name='busqueda' />
                    <label htmlFor='busqueda' className={`${style.placeholderLabel}`}>Buscar recetas...</label>
                    <ErrorMessage name='busqueda' component='div' className={`${style.error}`} />
                    <button type='submit' className={`${style.submitBtn}`} title='Buscar Receta'>
                        <CiSearch />
                    </button>
                </Form>
            </Formik>
            <button className={`${style.filterBtn}`} title='Filtros' onClick={notWork}>
                <MdFilterList />
            </button>
        </div>
    );
};

export default MainSearch;