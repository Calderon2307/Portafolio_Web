import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@components/Header/Header';
import LoadingView from '@components/LoadingView/LoadingView';
import ItemInfoCard from '@components/ItemInfoCard/ItemInfoCard';
import useWindowSize from '@hooks/useWindowSize';
import { capitalizeText } from '@utils/formatText';
import {
  SearchItemContext,
  UpdateSearchLabelContext,
} from '@context/SearchContext';
import { ItemCard } from '@models/items';
import { itemsCategories } from '@data/itemsCategories';
import { POKEMON_ALL_ITEMS_URL } from '@routes/api.routes';
import {
  fetchCompleteItems,
  fetchCompleteItemsWithUrl,
} from '@services/ItemServices/itemCardService';
import { fetchItemsByCategory } from '@services/ItemServices/itemCategoryService';
import prevIcon from '@assets/icons/prevLight.png';
import nextIcon from '@assets/icons/nextLight.png';
import closeIcon from '@assets/icons/closeDark.png';
import filterIcon from '@assets/icons/filterAlt2.png';
import faviconIcon from '@assets/icons/Favicon.png';
import style from '@pages/SearchItem/SearchItem.module.css';
//import { itemsCards } from '@data/item.test';

const SearchItem = () => {
  const { width } = useWindowSize();
  const updateLable = useContext(UpdateSearchLabelContext);
  const itemToSearch = useContext(SearchItemContext);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const regionDexRef = useRef<string>('all');

  const [itemsCardArr, setItemsCardArr] = useState<ItemCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allPokemonNextUrl, setAllPokemonNextUrl] = useState<string | null>(
    null,
  );
  const [allPokemonPrevUrl, setAllPokemonPrevUrl] = useState<string | null>(
    null,
  );
  const [pokemonCount, setPokemonCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('all');
  const navigate = useNavigate();
  const pageTitle: string = `${capitalizeText(currentCategory)} Items`;
  let itemCardSize: 'normal' | 'medium' | 'small' = 'normal';

  if (width > 670 && width <= 1080) {
    itemCardSize = 'medium';
  } else if (width <= 670) {
    itemCardSize = 'small';
  } else {
    itemCardSize = 'normal';
  }

  updateLable('Item');

  const fileteredItems = itemsCardArr.filter((item: ItemCard) =>
    item.name.includes(itemToSearch.split(' ').join('-').toLowerCase()),
  );
  const noItemsMessage = {
    title: '',
    message: '',
  };

  if (currentCategory === 'all') {
    noItemsMessage.title = 'NO ITEMS FOUND!';
    noItemsMessage.message = 'Try to load more items!';
  } else {
    noItemsMessage.title = 'NO ITEMS FOUND!';
    noItemsMessage.message = `The searched item does not belong to the category: ${capitalizeText(regionDexRef.current)} or does not exist.`;
  }

  const generatePagination = () => {
    let visiblePages = [];
    const totalPages = Math.ceil(pokemonCount / 60);

    if (totalPages <= 8) {
      visiblePages = Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    } else {
      if (currentPage <= 4) {
        visiblePages = [1, 2, 3, 4, 5, '...', totalPages];
      } else if (currentPage >= totalPages - 3) {
        visiblePages = [
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        visiblePages = [
          1,
          '...',
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          '...',
          totalPages,
        ];
      }
    }
    return visiblePages;
  };

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleCategorySelected = async (
    idFilter: number,
    nameFilter: string,
  ) => {
    setIsOpen(false);
    regionDexRef.current = nameFilter;
    try {
      setIsLoading(true);
      if (idFilter !== 0) {
        const itemsByCategory = await fetchItemsByCategory(idFilter);
        setItemsCardArr(itemsByCategory);
      } else {
        const url = POKEMON_ALL_ITEMS_URL;
        const allItems = await fetchCompleteItems(url);
        setAllPokemonNextUrl(allItems.nextUrl);
        setAllPokemonPrevUrl(allItems.prevUrl);
        setPokemonCount(allItems.count);
        setItemsCardArr(allItems.results);
        setCurrentPage(1);
      }
      setCurrentCategory(nameFilter);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdItem = (id: number = -1, name: string = '') => {
    const slug: string = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    navigate(`/items/${id}/${slug}`);
  };

  const handlePageItem = async (url: string, action: string) => {
    try {
      setIsLoading(true);
      const allItems = await fetchCompleteItems(url);

      setAllPokemonNextUrl(allItems.nextUrl);
      setAllPokemonPrevUrl(allItems.prevUrl);
      setItemsCardArr(allItems.results);

      if (action === 'increase') setCurrentPage((prev) => prev + 1);
      else setCurrentPage((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePagination = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const newOffset = (pageNumber - 1) * 60;
      const allItems = await fetchCompleteItemsWithUrl(60, newOffset);
      setAllPokemonNextUrl(allItems.nextUrl);
      setAllPokemonPrevUrl(allItems.prevUrl);
      setItemsCardArr(allItems.results);
      setCurrentPage(pageNumber);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current?.showModal();
    } else {
      setTimeout(() => {
        dialogRef.current?.close();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const url = POKEMON_ALL_ITEMS_URL;
        const allItems = await fetchCompleteItems(url);
        setAllPokemonNextUrl(allItems.nextUrl);
        setAllPokemonPrevUrl(allItems.prevUrl);
        setPokemonCount(allItems.count);
        setItemsCardArr(allItems.results);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return isLoading ? (
    <>
      <Helmet>
        <title>{pageTitle} | Pokédex</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>
      <LoadingView
        message={`Loading ${regionDexRef.current === 'all' ? '' : 'all'} ${capitalizeText(regionDexRef.current)} Items`}
      />
    </>
  ) : (
    <>
      <Helmet>
        <title>{pageTitle} | Pokédex</title>
        <link rel="shortcut icon" href={faviconIcon} type="image/x-icon" />
      </Helmet>
      <Header mode={'complete'} showButton={false} />
      <dialog
        ref={dialogRef}
        className={`${style.dialog} ${isOpen ? style.openDialog : style.closeDialog}`}
        onClose={handleDialogClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) handleDialogClose();
        }}
      >
        <article className={`${style.dialogContent}`}>
          <button
            className={`${style.closeButton}`}
            onClick={handleDialogClose}
            title="Close Dialog"
          >
            <img
              src={closeIcon}
              alt="Close Dialog Icon"
              className={`${style.closeIcon}`}
            />
          </button>
          <h3 className={`${style.dialogTitle}`}>Choose a Category</h3>
          <section className={`${style.categories}`}>
            {itemsCategories.map((category) => {
              return (
                <button
                  key={category.name}
                  className={`${style.category} ${currentCategory === category.name ? style.categorySelected : ''}`}
                  onClick={() =>
                    handleCategorySelected(category.id, category.name)
                  }
                  title={`SEE ${category.name.toUpperCase()} ITEMS`}
                >
                  {category.name.toUpperCase()}
                </button>
              );
            })}
          </section>
        </article>
      </dialog>

      <article className={`${style.mainSection}`}>
        <section className={`${style.infoSection}`}>
          <h2 className={`${style.title}`}>Items</h2>
          <section className={`${style.filterSection}`}>
            <h3 className={`${style.subTitle}`}>{currentCategory}</h3>
            <button
              className={`${style.categoryButton}`}
              onClick={handleDialogOpen}
              title="Select Category"
            >
              Categories
              <img
                src={filterIcon}
                alt="Filter Icon"
                className={`${style.icon}`}
              />
            </button>
            <h3 className={`${style.subTitle}`}>
              {currentCategory !== 'all' ? fileteredItems.length : pokemonCount}{' '}
              items
            </h3>
          </section>
        </section>
        <section className={`${style.cardsSection}`}>
          {fileteredItems.length > 0 ? (
            fileteredItems.map((item) => {
              return (
                <ItemInfoCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  subCategory={item.subCategory}
                  sprite={item.sprite}
                  onClickId={handleIdItem}
                  size={itemCardSize}
                />
              );
            })
          ) : (
            <p className={`${style.emptyPokemonMessage}`}>
              <span className={`${style.emptyPokemonTitle}`}>
                {noItemsMessage.title}
              </span>
              {noItemsMessage.message}
            </p>
          )}
        </section>
        {currentCategory === 'all' && (
          <section className={`${style.buttonsContainer}`}>
            {allPokemonPrevUrl !== null && (
              <button
                key={'buttonPaginationPokedex-1'}
                onClick={() => handlePageItem(allPokemonPrevUrl!, 'decrease')}
                disabled={allPokemonPrevUrl === null}
                className={`${style.button}`}
                title="See Previous Pokemon"
              >
                <img
                  src={prevIcon}
                  alt="Previous Icon"
                  className={`${style.paginationIcon}`}
                />
              </button>
            )}
            <section className={`${style.pagesContainer}`}>
              {generatePagination().map((pageNumber, index) => {
                if (pageNumber === '...') {
                  return (
                    <span key={index} className={`${style.pageDots}`}>
                      {pageNumber}
                    </span>
                  );
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePagination(Number(pageNumber))}
                    className={`${style.pageButton} ${pageNumber === currentPage ? style.pageButtonSelected : ''}`}
                    title={`Go to page ${pageNumber}`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </section>
            {allPokemonNextUrl !== null && (
              <button
                key={'buttonPaginationPokedex-2'}
                onClick={() => handlePageItem(allPokemonNextUrl!, 'increase')}
                disabled={allPokemonNextUrl === null}
                className={`${style.button}`}
                title="See Next Pokemon"
              >
                <img
                  src={nextIcon}
                  alt="Previous Icon"
                  className={`${style.paginationIcon}`}
                />
              </button>
            )}
          </section>
        )}
      </article>
    </>
  );
};

export default SearchItem;
