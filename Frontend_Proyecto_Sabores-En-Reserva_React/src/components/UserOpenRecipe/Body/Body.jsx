import style from './Body.module.css';
import RecipeMainInfo from './RecipeMainInfo/RecipeMainInfo';
import RecipeDescription from './RecipeDescription/RecipeDescription';
import RecipeIngredients from './RecipeIngredients/RecipeIngredients';
import RecipeSteps from './RecipeSteps/RecipeSteps';
import RecipeAssessment from './RecipeAssessment/RecipeAssessment';
import RecipeCommentsBox from './RecipeCommentsBox/RecipeCommentsBox';
import RecipeCommentsSection from './RecipeCommentsSection/RecipeCommentsSection';
import { useState } from 'react';

const Body = ({ user }) => {

    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(null);

    let userShow = user;

    const handleCommentSubmit = (comment) => {
        setComments([...comments, comment]);
    };

    return (
        <main className={`${style.main}`}>
            <RecipeMainInfo />
            <RecipeDescription />
            <RecipeIngredients />
            <RecipeSteps />
            {
                userShow ?
                    (
                        <>
                            <RecipeAssessment rating={rating} onRatingSubmit={setRating} />
                            <RecipeCommentsBox onSubmit={handleCommentSubmit} />
                            <RecipeCommentsSection comments={comments} rating={rating} />
                        </>
                    )
                    :
                    ''
            }
        </main>
    );
};

export default Body;