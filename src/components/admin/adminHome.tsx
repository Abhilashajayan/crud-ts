import React, {useState, useEffect } from 'react'
import axios from '../../../axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from "../../reduxStore/store";
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../reduxStore/slice';



const adminHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  let users = useSelector((state: RootState) => state.auth.allUsers);
  const [dataId, setDataId] = useState<number | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  

  if (searchTerm) {
    if(searchTerm) {
      users = users.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }
}

const handledelete = async (userId: string) =>{
  try {
          
    console.log(userId);
    await axios.delete(`/admin/delete/${userId}`);
    dispatch(
      getUsers({
          users: users.filter(user => user._id !== userId)
      })
  );
    console.log('Item deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error);
  }
} 


  useEffect(() => {
    axios.get('/admin/getUser').then(response => {
        dispatch(
            getUsers({
                users: response.data.users
            })
        );
        navigate('/admin/Home')
    }).catch(error => {
        setError(error.response.data.error || "something went wrong");
        setShowError(true);
    })
}, [])

  return (
    <>
    <nav className="">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a className="flex items-center">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Admin</span>
  </a>
  <div className="flex md:order-2">
    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span className="sr-only">Search</span>
    </button>
    <div className="relative hidden md:block">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search icon</span>
      </div>
      <input type="text" id="search-navbar"  onChange={handleSearch}  value={searchTerm}  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
      
    </div>
    <button   className=' ml-5  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  '>Logout</button>
   
   
  </div>
  
  </div>
</nav>
        <div className='bg-white w-screen h-screen'>
        <section className="mb-20 text-gray-800">

<div className="block rounded-lg shadow-lg bg-white">
     <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
               <div className="inline-block min-w-full sm:px-6 lg:px-8">
                   <div className="overflow-hidden">
                      <table className="min-w-full mb-0">
                         <thead className="border-b bg-gray-50 rounded-t-lg text-left">
                          <tr>
                          <th scope="col" className="rounded-tl-lg text-sm font-medium px-6 py-4">NAME</th>
                          <th scope="col" className="text-sm font-medium px-6 py-4">Email</th>
                          <th scope="col" className="text-sm font-medium px-6 py-4">STATUS</th>
                        <th scope="col" className="text-sm font-medium px-6 py-4">ROLE</th>
                         <th scope="col" className="rounded-tr-lg text-sm font-medium px-6 py-4"></th>
                         </tr>
                          </thead>
                        <tbody>
                        {

                        }
                         {users.map((user) => (
                         <tr key={user?._id}  className="border-b">
                          <th scope="row" className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                         <div className="flex flex-row items-center">
                       <img
                className="rounded-full w-12"
                src={user?.picturePath}
                alt="Avatar"
              />
              <div className="ml-4">
                <p className="mb-0.5 font-medium">{user?.name}</p>
               
              </div>
            </div>
          </th>
          <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
            <div className="flex flex-col">
              <p className="mb-0.5">{user?.email}</p>
             
            </div>
          </td>
          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
            <span className="text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-medium bg-green-200 text-green-600 rounded-full">User</span>
          </td>
          <td className="align-middle text-gray-500 text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
          <a href="#!"    className="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out">Edit</a>
          </td>
          <td className="align-middle text-right text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
            <a href="#!"  onClick={() => handledelete(user?._id)}className="font-medium text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 transition duration-300 ease-in-out">Delete</a>
          </td>
         
        </tr>
        
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
</div>
</div>

{/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  dataId={dataId} /> */}

</section>
        </div>
    </>
  )
}
export default adminHome;
