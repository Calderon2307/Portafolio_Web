import { ErrorMessage, Field, Form, Formik } from 'formik';
import style from './Body.module.css';
import { FaTrash } from "react-icons/fa";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


const Body = () => {

    const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
    const [steps, setSteps] = useState(['']);
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

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: '' }]);
    };

    const removeIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const addStep = () => {
        setSteps([...steps, '']);
    };

    const removeStep = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    };

    const onSubmit = async ({ resetForm }) => {
        Navigate('/user-home');
        resetForm();
    };

    const validate = (values) => {
        const errors = {};

        const imgRecipe = values.imgRecipe;

        if (imgRecipe) {
            const allowedExtensions = ['jpg', 'jpeg', 'png']; // Puedes ampliar esta lista según tus necesidades
            const fileExtension = imgRecipe.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                errors.imgRecipe = 'Formato de archivo no permitido. Solo se permiten archivos JPG, JPEG o PNG';
            }
        }

        if (!values.recipeTitle.trim()) {
            errors.recipeTitle = 'Campo obligatorio';
        } else if (values.recipeTitle.trim().length > 30) {
            errors.recipeTitle = 'El título debe tener 30 caracteres o menos.';
        } else if (values.recipeTitle.trim().length < 3) {
            errors.recipeTitle = 'El título debe tener al menos 3 caracteres.';
        } else {
            const containsSpecialCharsOrNumbers = /[^a-zA-Z\s]/.test(values.recipeTitle);

            if (containsSpecialCharsOrNumbers) {
                errors.recipeTitle = 'El título solo debe contener letras y espacios.';
            }
        }

        const forbiddenWords = [
            'admin', 'root', 'user', 'commit', 'drop', 'delete', 'update', 'insert',
            'select', 'from', 'all', 'pene', 'vagina', 'verga', 'pito', 'mierda',
            'pendejo', 'culero', 'pendeja', 'culera', 'culo', 'trasero', 'ano',
            'puta', 'puto', 'ramera', 'prostituta', 'caca', 'perra',
            'perro', 'cerote', 'cerota',
        ];

        const containsForbiddenWordTitle = forbiddenWords.some((word) =>
            values.recipeTitle.toLowerCase().includes(word)
        );

        if (containsForbiddenWordTitle) {
            errors.recipeTitle = 'El título contiene palabras no permitidas.';
        }

        if (!values.recipeDescription.trim()) {
            errors.recipeDescription = 'Campo obligatorio';
        } else {
            const containsForbiddenWordDescription = forbiddenWords.some((word) =>
                values.recipeDescription.toLowerCase().includes(word)
            );
            if (containsForbiddenWordDescription) {
                errors.recipeDescription = 'La descripcion contiene palabras no permitidas.';
            }
        }

        if (!values.recipePeople.trim()) {
            errors.recipePeople = 'Campo obligatorio';
        } else {
            const isNumeric = /^[0-9]+$/.test(values.recipePeople);

            if (!isNumeric) {
                errors.recipePeople = 'El campo de comensales debe contener solo números.';
            }
        }

        if (!values.recipeTime.trim()) {
            errors.recipeTime = 'Campo obligatorio';
        } else {
            const regex = /^\d+(h|hrs?|min|m|seg|s)$/i;

            if (!regex.test(values.recipeTime)) {
                errors.recipeTime = 'Formato de tiempo inválido. Debe ser un número seguido de una unidad de tiempo (h, min, seg) sin espacios.';
            }
        }

        if (!values.recipePrice.trim()) {
            errors.recipePrice = 'Campo obligatorio';
        } else {
            const allowedCurrencies = ['$', '€', '¥', '£'];
            const regexPrice = new RegExp(`^[${allowedCurrencies.join('')}](?=\\d)(\\d*(\\.\\d{1,2})?)?$`);


            if (!regexPrice.test(values.recipePrice)) {
                errors.recipePrice = 'Formato de precio inválido. Debe comenzar con un símbolo monetario seguido de un número (entero o decimal) sin espacios.';
            }
        }


        if ((!values.ingredients || values.ingredients.length <= 1) || (values.ingredients.name == '' || values.ingredients.amount == '')) {
            errors.ingredients = 'Debes agregar al menos un ingrediente';
        } else {
            values.ingredients.forEach((ingredient, index) => {
                if (!ingredient.name.trim()) {
                    errors[`ingredients[${index}].name`] = 'Campo obligatorio';
                } else {
                    const containsForbiddenWordIngredient = forbiddenWords.some((word) =>
                        ingredient.name.toLowerCase().includes(word)
                    );
                    if (containsForbiddenWordIngredient) {
                        errors[`ingredients[${index}].name`] = 'El ingrediente contiene palabras no permitidas.';
                    }
                }

                if (!ingredient.amount.trim()) {
                    errors[`ingredients[${index}].amount`] = 'Campo obligatorio';
                } else {
                    const containsForbiddenWordIngredientAmount = forbiddenWords.some((word) =>
                        ingredient.amount.toLowerCase().includes(word)
                    );
                    if (containsForbiddenWordIngredientAmount) {
                        errors[`ingredients[${index}].amount`] = 'La cantidad contiene palabras no permitidas.';
                    }
                }

            });
        }

        if (!values.steps || values.steps.length <= 1) {
            errors.steps = 'Debes agregar al menos un paso';
        } else {
            values.steps.forEach((step, index) => {
                if (!step.trim()) {
                    errors[`steps[${index}]`] = 'Campo obligatorio';
                } else if (step.trim().length > 250) {
                    errors[`steps[${index}]`] = 'El título debe tener 250 caracteres o menos.';
                } else if (step.trim().length < 4) {
                    errors[`steps[${index}]`] = 'El título debe tener al menos 3 caracteres.';
                } else {
                    const containsForbiddenWordStep = forbiddenWords.some((word) =>
                        step.toLowerCase().includes(word)
                    );
                    if (containsForbiddenWordStep) {
                        errors[`steps[${index}]`] = 'El paso contiene palabras no permitidas.';
                    }
                }
            });
        }

        return errors;
    };

    return (
        <main className={`${style.main}`}>
            <Formik
                initialValues={{
                    imgRecipe: '',
                    recipeTitle: '',
                    recipeDescription: '',
                    recipePeople: '',
                    recipeTime: '',
                    recipePrice: '',
                    ingredients: ingredients,
                    steps: steps,
                }}

                onSubmit={onSubmit}

                validate={validate}
            >
                <Form className={`${style.form}`}>
                    <div className={`${style.mainInfo}`}>
                        <div className={`${style.imgField}`}>
                            <label htmlFor='imgField' className={`${style.label} ${style.labelImg}`}>
                                Imagen de Receta
                            </label>
                            <div className={`${style.imgContainer}`} onClick={() => document.getElementById('imgField').click()}>
                                {selectedImage ? (
                                    <img className={`${style.img}`} src={selectedImage} alt='Perfil' />
                                ) : (
                                    <img className={`${style.img}`} src='src/assets/addPhoto.png' alt='Default' />
                                )}
                            </div>
                            <Field
                                type='file'
                                id='imgField'
                                name='imgRecipe'
                                onChange={handleImageChange}
                                className={`${style.input} ${style.inputImg}`}
                            />
                            <ErrorMessage name="imgRecipe" component="div" className={`${style.error}`} />
                        </div>
                        <div className={`${style.infoRecipe}`}>
                            <div className={`${style.recipeName}`}>
                                <label htmlFor='recipeTitle' className={`${style.label} ${style.labelTitle}`}>
                                    Titulo de Receta
                                </label>
                                <Field
                                    type='text'
                                    name='recipeTitle'
                                    className={`${style.input} ${style.inputTitle}`}
                                    id='recipeTitle'
                                />
                                <ErrorMessage name="recipeTitle" component="div" className={`${style.error}`} />
                            </div>
                            <div className={`${style.recipeDescription}`}>
                                <label htmlFor='recipeDescription' className={`${style.label} ${style.labelDescription}`}>
                                    Descripcion de Receta
                                </label>
                                <Field
                                    as='textarea'
                                    name='recipeDescription'
                                    className={`${style.input} ${style.inputDescription}`}
                                    id='recipeDescription'
                                    cols='50'
                                    rows='5'
                                />
                                <ErrorMessage name="recipeDescription" component="div" className={`${style.error}`} />
                            </div>
                        </div>
                    </div>
                    <div className={`${style.extraInfo}`}>
                        <div className={`${style.recipePeople}`}>
                            <label htmlFor='recipePeople' className={`${style.label} ${style.labelPeople}`}>Comensales</label>
                            <Field
                                type='text'
                                name='recipePeople'
                                className={`${style.input} ${style.inputPeople}`}
                                id='recipePeople'
                            />
                            <ErrorMessage name="recipePeople" component="div" className={`${style.error}`} />
                        </div>
                        <div className={`${style.recipeTime}`}>
                            <label htmlFor='recipeTime' className={`${style.label} ${style.labelTime}`}>Tiempo</label>
                            <Field
                                type='text'
                                name='recipeTime'
                                className={`${style.input} ${style.inputTime}`}
                                id='recipeTime'
                            />
                            <ErrorMessage name="recipeTime" component="div" className={`${style.error}`} />
                        </div>
                        <div className={`${style.recipePrice}`}>
                            <label htmlFor='recipePrice' className={`${style.label} ${style.labelPrice}`}>Precio</label>
                            <Field
                                type='text'
                                name='recipePrice'
                                className={`${style.input} ${style.inputPrice}`}
                                id='recipePrice'
                            />
                            <ErrorMessage name="recipePrice" component="div" className={`${style.error}`} />
                        </div>
                    </div>
                    <div className={`${style.recipeIngredients}`}>
                        <div className={`${style.titlesContainer}`}>
                            <h2 className={`${style.title}`}>Ingrediente</h2>
                            <h2 className={`${style.title}`}>Cantidad</h2>
                        </div>
                        <div className={`${style.ingredientsContainer}`}>
                            {ingredients.map((ingredient, index) => (
                                <div className={`${style.ingredient}`} key={index}>
                                    <label htmlFor={`ingredientName${index}`} className={`${style.label} ${style.labelIngredient}`}>
                                        Ingrediente
                                    </label>
                                    <Field
                                        type='text'
                                        name={`ingredients[${index}].name`}
                                        className={`${style.input} ${style.inputIngredient}`}
                                        id={`ingredientName${index}`}

                                    />
                                    <label htmlFor={`ingredientAmount${index}`} className={`${style.label} ${style.labelAmount}`}>
                                        Cantidad
                                    </label>
                                    <Field
                                        type='text'
                                        name={`ingredients[${index}].amount`}
                                        className={`${style.input} ${style.inputAmount}`}
                                        id={`ingredientAmount${index}`}
                                    />
                                    <FaTrash
                                        className={`${style.icon}`}
                                        onClick={() => removeIngredient(index)}
                                    />
                                    <ErrorMessage name="ingredients" component="div" className={`${style.error}`} />
                                </div>
                            ))}

                        </div>
                        <div className={`${style.buttonsContainer}`}>
                            <button type='button' className={`${style.button} ${style.addIngredientBtn}`} onClick={addIngredient}>Agregar Ingrediente</button>
                        </div>
                    </div>
                    <div className={`${style.recipeSteps}`}>
                        <h2 className={`${style.title}`}>Pasos</h2>
                        {steps.map((step, index) => (
                            <div className={`${style.stepContainer}`} key={index}>
                                <div className={`${style.stepWrapper}`}>
                                    <label htmlFor={`recipeStep${index}`} className={`${style.label} ${style.labelStep}`}>{index + 1}</label>
                                    <Field
                                        as='textarea'
                                        name={`steps[${index}]`}
                                        id={`recipeStep${index}`}
                                        className={`${style.input} ${style.inputStep}`}
                                        rows='5'
                                        cols='50'
                                    />
                                    <FaTrash
                                        className={`${style.icon}`}
                                        onClick={() => removeStep(index)}
                                    />
                                </div>
                                <ErrorMessage name="steps" component="div" className={`${style.error}`} />
                            </div>
                        ))}
                        <div>
                            <button type='button' className={`${style.button} ${style.addStepBtn}`} onClick={addStep}>Agregar Paso</button>
                        </div>
                    </div>
                    <button type='submit' className={`${style.button} ${style.submitBtn}`}>Publicar Receta</button>
                </Form>
            </Formik>
        </main>
    );
};

export default Body;