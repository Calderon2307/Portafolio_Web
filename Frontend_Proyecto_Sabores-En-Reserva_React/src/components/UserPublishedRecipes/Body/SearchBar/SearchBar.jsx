import { Field, Form, Formik } from 'formik';
import style from './SearchBar.module.css';
import { CiSearch } from "react-icons/ci";
import { MdFilterList } from "react-icons/md";
import { useEffect, useState } from 'react';

const SearchBar = ({ savedPageLoad }) => {

    const [title, setTitle] = useState('');

    useEffect(() => {
        if (savedPageLoad) setTitle('Recetas Guardadas');
        else setTitle('Recetas Publicadas');
    }, [savedPageLoad]);

    const onSubmit = (values, { resetForm }) => {

        console.log(values);
        resetForm();
    };

    return (
        <section className={`${style.section}`}>
            <div className={`${style.searchBar}`}>
                <div className={`${style.searchContainer}`}>
                    <Formik
                        initialValues={{
                            search: '',
                        }}

                        onSubmit={onSubmit}
                    >
                        <Form className={`${style.form}`}>
                            <label htmlFor='searchField' className={`${style.label}`}>{title}</label>
                            <div className={`${style.wrapper}`}>
                                <Field
                                    type='search'
                                    name='search'
                                    placeholder='Buscar Receta Publicada ...'
                                    className={`${style.input}`}
                                    id='searchField'
                                />
                                <button type='submit' className={`${style.submitBtn}`}>
                                    <CiSearch />
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <button className={`${style.filterBtn}`}>
                        <MdFilterList />
                    </button>
                </div>
                <div className={`${style.btnsContainer}`}>
                    <button className={`${style.btn} ${style.editBtn}`}>Editar</button>
                    <button className={`${style.btn} ${style.deleteBtn}`}>Eliminar</button>
                </div>
            </div>
        </section>
    );
};

export default SearchBar;