import { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../context/Auth'
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../utils/navLinks';

const Sidebar = () => {

  const [user] = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('collapsed') === 'true');

  useEffect(() => {
    localStorage.setItem('collapsed', collapsed);
  },[collapsed]); 

  return (
    <aside className={`bg-white dark:bg-gray-800 shadow h-full transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className='p-4 flex justify-between items-center border-b dark:text-white'>
        {!collapsed && <span className='font-bold text-lg'>Dashboard</span>}
        <button onClick={() => setCollapsed((c) => !c)} className='text-gray-700 dark:text-white'>
        {collapsed ? <Menu size={20} /> : <X size={20} /> } 
        </button> 
      </div>

        <nav className='flex flex-col p-4 gap-2'>
          {navLinks[user?.role || "patient"]?.map((link, idx) => (
            <Link 
              key={idx}
              to={link.to}
              className={`text-sm px-2 py-1 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 ${collapsed ? 'text-center' : ''}`}
            > 
              {collapsed ? link.label.charAt(0) : link.label}
          </Link>
          ))}
        </nav>  
    </aside>
  )
}

export default Sidebar;