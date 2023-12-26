import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import style from './QuestionSection.module.css';
import QuestionCard from "./QuestionCard/QuestionCard";

const QuestionSection = ({ info = {}, prev, next, correct, userSelect }) => {

    if (Object.keys(info).length === 0) {
        return;
    }

    return (
        <section className={`${style.questionSection}`}>

            <MdNavigateBefore className={`${style.icon} ${style.before}`} title='Prev Question' onClick={prev} />

            <QuestionCard
                key={info.id}
                cardInfo={info}
                correct={correct}
                userSelect={userSelect}
            />

            <MdNavigateNext className={`${style.icon} ${style.next}`} title='Next Question' onClick={next} />

        </section>
    );
};

export default QuestionSection;