import style from './DerechosAutor.module.css';

const DerechosAutor = () => {

    return (
        <div className={`${style.derechos}`}>
            <p className={`${style.title}`}>Derechos de Autor</p>
            <p>Grupo 03 PW Dinotrueno &copy;</p>
        </div>
    );
};

export default DerechosAutor;