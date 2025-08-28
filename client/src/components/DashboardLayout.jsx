import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({children}) => {
 
  return (
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
      <Sidebar />
        <div className='flex-1 flex flex-col '>
          <Navbar />
          <main className='p-4 overflow-y-auto'>
            {children}
          </main>
        </div>      
    </div>
  )
}

export default DashboardLayout

  