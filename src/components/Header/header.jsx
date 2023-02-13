import s from './index.module.css';
import cn from 'classnames';


function Header({children, user, onUpdateUser}) {

  const handleClickButtonEdit = (e)=> {
    e.preventDefault();
    onUpdateUser({name: 'Дмитрий', about: 'Программист'})
  }

  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        <div className={s.wrapper}>
          {children}
        {/* {user?.email && <span>{user?.email}</span>} */}
        {user?.name && <span>Здраствуйте, {user?.name}</span>}
        <button className='btn' onClick={handleClickButtonEdit}>Изменить</button>
        </div>
      </div>
    </header>
  )
}

export default Header;
