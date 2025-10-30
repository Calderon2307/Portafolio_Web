import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import faviconIcon from '@assets/icons/Favicon.png';
import style from '@pages/Home/Home.module.css';

const Home = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>POKÉDEX | Home</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>
      <div className={`${style.mainPage}`}>
        <Header mode={'partial'} />
        <div className={`${style.wrapper}`}>
          <h1 className={`${style.title}`} title={`POKEDEX`}>
            POKEDEX
          </h1>
          <section className={`${style.buttonsSection}`}>
            <Link
              to={'/search-pokemon'}
              className={`${style.button}`}
              title={`Search a Pokémon`}
            >
              Search Pokémon
            </Link>
            <Link
              to={'/search-type'}
              className={`${style.button}`}
              title={`See all Pokémon of a selcted type`}
            >
              Search Type
            </Link>
            <Link
              to={'/search-region'}
              className={`${style.button}`}
              title={`See all Pokémon from a specific region`}
            >
              Search Region
            </Link>
            <Link
              to={'/search-item'}
              className={`${style.button}`}
              title={`See al items`}
            >
              Search Item
            </Link>
            <Link
              to={'/pokedex/pokedex/all-pokedex'}
              className={`${style.button}`}
              title={`See all Pokémon`}
            >
              View All Pokémon
            </Link>
          </section>
        </div>
        {/*<Footer />*/}
      </div>
    </>
  );
};

export default Home;
