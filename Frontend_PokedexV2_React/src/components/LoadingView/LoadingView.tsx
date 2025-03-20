import loadingGif2 from '@assets/styles/loading_2.gif';
import style from '@components/LoadingView/LoadingView.module.css';

type LoadingViewProps = {
  message: string;
};

const LoadingView: React.FC<LoadingViewProps> = ({ message }) => {
  return (
    <article className={`${style.loadingComponent}`}>
      <figure className={`${style.gifContainer}`}>
        <img src={loadingGif2} alt="Loading Gif" className={`${style.gif}`} />
      </figure>

      <section className={`${style.messageSection}`}>
        <p className={`${style.messagetitle}`}>LOADING...</p>
        <p className={`${style.message}`}>{message}</p>
      </section>
    </article>
  );
};

export default LoadingView;
