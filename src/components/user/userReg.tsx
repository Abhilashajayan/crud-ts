import React, { useState } from 'react';
import validateInput from '../../validation/validate';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';


const RegistrationPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null | undefined>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateInput(name, email, password);

    if (!validation.isValid) {
      setError(validation.error);
      setShowError(true);
      return;
    }

    try {
      const response = await axios.post('/register', {
        name,
        email,
        password,
      });
      console.log('Registration successful!', response);
      navigate('/login')
    } catch (err : any) {
      setError(err.response.data.error);
      setShowError(true);
     
    }
  };


  return (
    <div className='bg-gray-600 flex justify-center items-center h-screen'>
      <div className='w-[400px] rounded shadow-lg p-8 bg-white'>
        <h2 className='text-2xl flex justify-center font-bold mb-4'>SIGN IN</h2>
        <form onSubmit={handleSubmit} >
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              onChange={(e) => setName(e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
              placeholder='Enter your name'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              className='mt-1 p-2 w-full border rounded-md'
              placeholder='Enter your password'
            />
          </div>
          {
            showError && <div className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                         <span className="font-medium">{error}</span>
                         </div>
           }
          <button
            type='submit'
            className='bg-green-500 text-white p-2 w-full rounded-md hover:bg-green-600 transition'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
