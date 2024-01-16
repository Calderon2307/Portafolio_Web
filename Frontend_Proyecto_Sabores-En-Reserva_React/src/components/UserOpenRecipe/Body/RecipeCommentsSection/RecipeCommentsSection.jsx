import style from './RecipeCommentsSection.module.css';
import Title from './Title/Title';
import Comment from './Comment/Comment';
import ButtonLoadComment from './ButtonLoadComment/ButtonLoadComment';

const RecipeCommentsSection = ({ comments, rating }) => {

    return (
        <section className={`${style.section}`}>
            <Title />
            <div className={`${style.commentsContainer}`}>
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} rating={rating} />
                ))}
            </div>
            <ButtonLoadComment />
        </section>
    );
};

export default RecipeCommentsSection;