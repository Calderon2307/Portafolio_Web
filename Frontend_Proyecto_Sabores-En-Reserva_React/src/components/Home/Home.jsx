import Header from './Header/Header';
import Footer from './Footer/Footer';
import Body from './Body/Body';

const Home = ({ setSearchTerm }) => {

    return (
        <>
            <Header setSearchTerm={setSearchTerm} />
            <Body />
            <Footer />
        </>
    );
};

export default Home;