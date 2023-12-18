

const Card = ({ element }) => {
    const mediaURL = element.media_type === "image" ? element.url : element.thumbnail_url;

    return (
        <li className="card">
            <div className="card__content">
                <h3 className="card__title card__link">
                    {element.title}
                </h3>
                <time className="card__date">{element.date}</time>
            </div>
            <img
                className="card__img"
                src={mediaURL}
                alt={element.title}
            />
        </li>
    );
};

export default Card;