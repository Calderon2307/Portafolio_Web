import style from './Body.module.css';
import ErrorSection from './ErrorSection/ErrorSection';

const Body = () => {

    return (
        <main className={`${style.main}`}>
            <ErrorSection />
        </main>
    );
};

export default Body;