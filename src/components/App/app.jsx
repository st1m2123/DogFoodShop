import { useState, useEffect, useCallback } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import './index.css';
// import data from '../../assets/data.json';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page';
import { ProductPage } from '../../pages/ProductPage/product-page';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { SortContext } from '../../context/sortContext';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import Modal from '../modal/modal';
import RegFrom from '../forms/registration'
import Login from '../forms/login';
import Profile from '../forms/profile';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [favorites, setFavorites] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("cheap");
  const [contacts, setContacts] = useState([]);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;
  
  const addContact = (contactInfo) => {
    setContacts([...contacts, contactInfo]);
  }
  const navigate = useNavigate()
  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery])

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userData._id));
        setFavorites(prevSate => favoriteProducts)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])

  const handleFormSubmit = (inputText) => {
    navigate('/');
    setSearchQuery(inputText);
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }

  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser._id)
    return api.changeLikeProduct(product._id, liked)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })

        if (!liked) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

        setCards(newProducts);
        return updateCard;
      })
  }, [currentUser, cards])

  return (
    <SortContext.Provider value={{ selectedTabId, setSelectedTabId }}>
      <UserContext.Provider value={{ user: currentUser, isLoading }}>
        {/* <Modal >
          <RegFrom addContact={addContact}/>
        </Modal> */}
        <CardContext.Provider value={{ cards, favorites, handleLike: handleProductLike }}>
          <Header >
            <>
              <Logo className="logo logo_place_header" href="/" />
              <Routes>
                <Route path='/' element={
                  <Search
                    onSubmit={handleFormSubmit}
                    onInput={handleInputChange}
                  />
                } />
              </Routes>
            </>
          </Header>
          <main className='content container'>
            <SeachInfo searchText={searchQuery} />
            <Routes location={backgroundLocation && {...backgroundLocation, pathname: initialPath || location}}>
              <Route index element={
                <CatalogPage />
              } />
              <Route path='/product/:productId' element={
                <ProductPage
                  isLoading={isLoading}
                />
              } />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/favorites' element={
                <FavoritePage />}
              />
              <Route path='/registration' element={<RegFrom/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path='/profile' element={<Profile/>} />
            </Routes>
            {backgroundLocation && (
              <Routes>
                <Route path='/registration' element={
                  <Modal>
                    <RegFrom linkState={{backgroundLocation: location, initialPath}}/>
                  </Modal>
                }/>
                <Route path='/login' element={
                  <Modal>
                    <Login linkState={{backgroundLocation: location, initialPath}}/>
                  </Modal>
                }/>
              </Routes>
            )}
          </main>
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </SortContext.Provider>
  )
}

export default App;
