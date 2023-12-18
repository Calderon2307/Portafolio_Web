import satellite from '../../../img/satellite.webp';

const CardNotFound = () => {
  return (
    <li className="card card--not-found">
      <img
        className=""
        src={satellite}
        alt=""
        width="100"
        height="100"
      />
      <p>Start exploring!</p>
    </li>
  );
};

export default CardNotFound;