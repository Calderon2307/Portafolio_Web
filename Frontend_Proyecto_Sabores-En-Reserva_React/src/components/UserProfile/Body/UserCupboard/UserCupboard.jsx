import style from './UserCupboard.module.css';
import Title from './Title/Title';
import UserActions from './UserActions/UserActions';
import UserIngredients from './UserIngredients/UserIngredients';
import { useState } from 'react';

const UserCupboard = () => {

    const [ingredients, setIngredients] = useState([]);

    const addIngredient = (newIngredient) => {
        setIngredients([...ingredients, newIngredient]);
    };

    const removeIngredient = (name, amount) => {
        const newIngredients = ingredients.filter(
            (ingredient) => !(ingredient.name === name && ingredient.amount === amount)
        );

        setIngredients(newIngredients);
    };

    return (
        <section className={`${style.section}`}>
            <Title />
            <UserActions addIngredient={addIngredient} />
            <UserIngredients ingredients={ingredients} removeIngredient={removeIngredient} />
        </section>
    );
};

export default UserCupboard;