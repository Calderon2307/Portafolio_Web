import style from './Comment.module.css';
import { TbChefHat } from "react-icons/tb";

const Comment = ({ comment, rating }) => {

    return (
        <article className={`${style.comment}`}>
            <div className={`${style.imgContainer}`}>
                <div className={`${style.userImg}`}>
                    <img />
                </div>
                <p className={`${style.userName}`}>
                    Nombre Usuario
                </p>
            </div>
            <p className={`${style.text}`}>
                {comment}
            </p>
            <div className={`${style.wrapper}`}>
                <p className={`${style.subtitle}`}>Valoracion</p>
                <div className={`${style.iconWrapper}`}>
                    {rating !== null ? <p className={`${style.number}`}>{rating}</p> : <p className={`${style.number}`} title='No ha calificado'>NC</p>}
                    <TbChefHat className={`${style.icon}`} />
                </div>
            </div>

        </article>
    );
};

export default Comment;