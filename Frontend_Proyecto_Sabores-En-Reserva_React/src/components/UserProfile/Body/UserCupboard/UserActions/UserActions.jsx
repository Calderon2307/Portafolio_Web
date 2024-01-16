import { ErrorMessage, Field, Form, Formik } from 'formik';
import style from './UserActions.module.css';

const UserActions = ({ addIngredient }) => {

    const onSubmit = (values, { resetForm }) => {
        addIngredient({ name: values.ingredient, amount: values.quantity });

        console.log(values);
        resetForm();
    };

    const validate = (values) => {
        const errors = {};

        if (!values.ingredient) {
            errors.ingredient = 'Campo obligatorio';
        } else {
            const palabrasProhibidas = [
                'admin', 'root', 'user', 'commit', 'drop', 'delete', 'update', 'insert',
                'select', 'from', 'all', 'pene', 'vagina', 'verga', 'pito', 'mierda',
                'pendejo', 'culero', 'pendeja', 'culera', 'culo', 'trasero', 'ano',
                'puta', 'puto', 'ramera', 'prostituta', 'negro', 'negra', 'perra',
                'perro', 'cerote', 'cerota',
            ];

            const ingredientSinEspacios = values.ingredient.replace(/\s/g, '').toLowerCase();

            if (palabrasProhibidas.some(palabra => ingredientSinEspacios.includes(palabra))) {
                errors.ingredient = 'El ingrediente contiene palabras inapropiadas';
            } else if (!/^[a-zA-Z\s]+$/.test(values.ingredient)) {
                errors.ingredient = 'El ingrediente solo puede contener letras y espacios';
            }
        }

        if (!values.quantity) {
            errors.quantity = 'Campo obligatorio';
        } else if (!/^\d+$/.test(values.quantity)) {
            errors.quantity = 'La cantidad debe ser un número';
        }

        return errors;
    };

    return (
        <div className={`${style.container}`}>
            <Formik
                initialValues={{
                    ingredient: '',
                    quantity: ''
                }}

                onSubmit={onSubmit}

                validate={validate}
            >
                <Form className={`${style.form}`}>
                    <div className={`${style.wrapper}`}>
                        <label htmlFor='quantityField' className={`${style.label}`}>
                            Cantidad
                        </label>
                        <Field
                            type='text'
                            id='quantityField'
                            name='quantity'
                            placeholder='5...'
                            className={`${style.input}`}
                        />
                        <ErrorMessage name='quantity' component='div' className={`${style.error}`} />
                    </div>
                    <div className={`${style.wrapper}`}>
                        <label htmlFor='ingredientField' className={`${style.label}`}>
                            Ingrediente
                        </label>
                        <Field
                            type='text'
                            id='ingredientField'
                            name='ingredient'
                            placeholder='Tomate...'
                            className={`${style.input}`}
                        />
                        <ErrorMessage name='ingredient' component='div' className={`${style.error}`} />
                    </div>
                    <button type='submit' className={`${style.button}`}>Agregar</button>
                </Form>
            </Formik>
        </div>
    );
};

export default UserActions;