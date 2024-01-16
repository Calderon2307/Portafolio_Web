import style from './Body.module.css';
import Card from '@/components/Home/Body/FeaturedRecipes/Card/Card';

const Body = ({ user, searchTerm }) => {

    return (
        <main className={`${style.main}`}>
            <section className={`${style.titleSection}`}>
                <h2 className={`${style.title}`}>
                    Resultados para: {searchTerm}
                </h2>
            </section>
            <section className={`${style.cardsSection}`}>
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                <Card user={user} />
                {/* {
                    searchResults.length !== 0 ?

                        <>
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                            <Card user={user} />
                        </>
                        :
                        <h2>NO HAY RESULTADOS PARA: {searchTerm}</h2>
                } */}
            </section>
        </main>
    );
};

export default Body;