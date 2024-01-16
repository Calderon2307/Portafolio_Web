import style from './RecipeImg.module.css';

const RecipeImg = () => {

    return (
        <div className={`${style.imgContainer}`}>
            <h2 className={`${style.title}`}>Nombre Receta</h2>
            <div className={`${style.wrapper}`}>
                <img className={`${style.img}`} src='src/assets/Comida7.jpeg' />
            </div>
        </div>
    );
};

export default RecipeImg;