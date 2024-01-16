import style from './UserIngredients.module.css';
import CardIngredient from './CardIngredient/CardIngredient';

const UserIngredients = ({ ingredients, removeIngredient }) => {

    return (
        <div className={`${style.cardsContainer}`}>
            {ingredients.map((ingredient, index) => (
                <CardIngredient key={index} name={ingredient.name} amount={ingredient.amount} onDelete={removeIngredient} />
            ))}
        </div>
    );
};

export default UserIngredients;