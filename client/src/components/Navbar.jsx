import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Auth';

const Navbar = () => {

  const [user] = useContext(AuthContext);
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
      if (dark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', dark);
  },[dark]);

  const handleLogout = () => {
      localStorage.removeItem('currentUser');
      window.location.href = '/';
  }


  return (
    <div className='flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-700 shadow'>
      <div className='text-lg font-semibold dark:text-white'>
          {user?.role?.toUpperCase()} Dashboard
      </div>
      <div className='flex items-center gap-4'>
        <span className='text-sm dark:text-gray-300'>Welcome, {user?.name}</span>

      <button onClick={() => setDark((d) => !d)} 
          className='text-sm px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500'>{dark ? '☀ Light' : '🌙 Dark'}</button>

      <button onClick={handleLogout} className='text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
        Log Out
      </button>
      </div> 
    </div>
  )
}

export default Navbar;
