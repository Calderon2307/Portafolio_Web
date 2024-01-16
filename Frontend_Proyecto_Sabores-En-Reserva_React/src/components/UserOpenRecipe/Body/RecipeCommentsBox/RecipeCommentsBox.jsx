import { ErrorMessage, Field, Form, Formik } from 'formik';
import style from './RecipeCommentsBox.module.css';

const RecipeCommentsBox = ({ onSubmit }) => {

    const handleSubmit = (values, { resetForm }) => {
        onSubmit(values.comentario);
        resetForm();
    };

    const validate = (values) => {
        const errors = {};

        if (!values.comentario) {
            errors.comentario = 'Campo obligatorio';
        } else {
            const palabrasProhibidas = [
                'admin', 'root', 'user', 'commit', 'drop', 'delete', 'update', 'insert',
                'select', 'from', 'all', 'pene', 'vagina', 'verga', 'pito', 'mierda',
                'pendejo', 'culero', 'pendeja', 'culera', 'culo', 'trasero', 'ano',
                'puta', 'puto', 'ramera', 'prostituta', 'negro', 'negra', 'perra',
                'perro', 'cerote', 'cerota',
            ];

            const comentarioSinEspacios = values.comentario.replace(/\s/g, '').toLowerCase();

            if (palabrasProhibidas.some(palabra => comentarioSinEspacios.includes(palabra))) {
                errors.comentario = 'El comentario contiene palabras inapropiadas';
            }
        }

        return errors;
    };

    return (
        <section className={`${style.section}`}>
            <h2 className={`${style.title}`}>
                Comentarios
            </h2>
            <Formik
                initialValues={{
                    comentario: ''
                }}

                onSubmit={handleSubmit}

                validate={validate}
            >
                <Form className={`${style.form}`}>
                    <label htmlFor='comentario' className={`${style.label}`}>Comentario</label>
                    <Field
                        as='textarea'
                        id='comentario' name='comentario'
                        rows='8'
                        cols='50'
                        placeholder="Escribe tu opinion sobre la receta..."
                        className={`${style.field}`}
                    />
                    <ErrorMessage name='comentario' component='div' className={`${style.error}`} />
                    <button type='submit' className={`${style.btnSubmit}`}>
                        Comentar
                    </button>
                </Form>
            </Formik>
        </section>
    );
};

export default RecipeCommentsBox;