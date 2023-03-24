import s from './index.module.css';
import cn from 'classnames';
import {ReactComponent as FavoriteIcon} from './img/favorites.svg';
import {ReactComponent as UserIcon} from './img/profile.svg';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';

function Header({children, user, onUpdateUser, setModelopen}) {
  const { favorites } = useContext(CardContext);
  const location = useLocation();
console.log(location);
  const handleOpenModal = () => {
    setModelopen(true)
  };

  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={{pathname:"/favorites", state: 'sfsdfsdf'}}>
              <FavoriteIcon/>
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
            {localStorage.getItem('token') === null ? 
            <Link to='/login' state={{backgroundLocation: location, initialPath: location.pathname}}>
            <UserIcon/>
            </Link> : <Link to='/profile'>
            <UserIcon/>
            </Link>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
