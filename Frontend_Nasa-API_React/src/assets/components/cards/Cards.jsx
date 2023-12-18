import Card from "./card/Card";
import CardNotFound from "./cardNotFound/CardNotFound";

const Cards = ({ apods }) => {
    return (
        <section
            className="image-section"
            role="status"
            aria-live="polite"
            aria-relevant="additions"
        >
            <h2 className="sr-only">
                List of images of Astronomy picture of the day
            </h2>
            <ul className="card-list container" id="container-cards">
                {apods.map((element) => (
                    <Card element={element} key={element.date} />
                ))}

                {(apods.length == 0) && <CardNotFound />}
            </ul>
        </section>
    );
};

export default Cards;