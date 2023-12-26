import { useState } from 'react';
import style from './AllQuestionsSection.module.css';

const AllQuestionsSection = ({ info, navigate, selectedId }) => {

    const navigateTo = (number) => {
        console.log(number);
        navigate(number - 1);
    }

    return (
        <section className={`${style.section}`}>
            <h2 className={`${style.title}`}>
                All Questions
            </h2>
            <div className={`${style.container}`}>
                {
                    info.map((preg) => {
                        return (
                            <article
                                key={preg.id}
                                className={`${style.questionNumber} ${selectedId === preg.id ? style.selected : ''}`}
                                title={`Question ${preg.id}\nTopic: ${preg.categoria}\nDifficulty: ${preg.dificultad}`}
                                onClick={() => navigateTo(preg.id)}
                            >
                                <p className={`${style.text}`}>
                                    {`Q${preg.id}`}
                                </p>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default AllQuestionsSection;