import React, { useState } from 'react';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';

const adminLogin = () => {

    const[name,setName] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const [error, setError] = useState<string| undefined >('');
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmits = async ( e: React.FormEvent ) =>{
        e.preventDefault();
       
        try {

            const response : any = await axios.post('/admin/login', { name, password });
            console.log('login is successful', response);
            navigate('/admin/Home');
        } catch (err : any) {
            setError(err.response.data.error);
            setShowError(true);
        }
    };
    

  return (
    
    <div className='bg-gray-600 flex justify-center items-center h-screen'>
      <div className='w-[400px] rounded shadow-lg p-8 bg-white'>
        <h2 className='text-2xl flex justify-center font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmits}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              id='text'
              onChange={(e)=>setName(e.target.value)}
              name='text'
              className='mt-1 p-2 w-full border rounded-md'
              placeholder='Enter your username'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              onChange={(e)=>setPassword(e.target.value)}
              name='password'
              className='mt-1 p-2 w-full border rounded-md'
              placeholder='Enter your password'
            />
          </div>
          {
            showError && <div className="mb-2 text-sm text-red-800 rounded-lg  " role="alert">
                         <span className="font-medium">{error}</span>
                         </div>
           }
          <button
            type='submit'
           
            className='bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600 transition'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default adminLogin;
