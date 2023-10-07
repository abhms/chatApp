import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@mui/material';
import Navbar from '@/components/Navbar';

const Signup: React.FC = () => {
  const [allData, setAllData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState('');
  const router = useRouter();
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      router.push('/profile');
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAllData({ ...allData, [name]: value });
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allData.firstname || !allData.email || !allData.password) {
      setError("all fields are required*")
      return;
    }

    try {
      const { firstname,
        lastname,
        email,
        password } = allData
      const res = await axios.post('/api/register', { firstname, lastname, email, password });

      const token = res.data?.token;

      if (token) {
        localStorage.setItem('token', token);

        router.push('/profile');
      } else {
        setError('An error occurred during signup');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during signup');
    }
  };


  return (
    <>
    <Navbar/>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-2xl font-semibold text-center text-gray-700">
            Create an account
          </h1>
          <form className="mt-6" onSubmit={handleSignup}>
            {error && error.length ? <>
              <h1 style={{ color: "#e82617" }}>{error}</h1>
            </> : null}
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                FirstName
              </label>
              <input
                type="text"
                name="firstname"
                value={allData.firstname}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >LastName
              </label>
              <input
                type="text"
                name="lastname"
                value={allData.lastname}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={allData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                value={allData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <p className="text-xs text-gray-800 font-bold">
              Password must be at least 8 characters long
            </p>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600"
              >
                Sign up
              </button>
            </div>
          </form>
          <p className="mt-2 text-xs text-center text-gray-700" > </p>
                    <Link href="/auth/signin" className='sign-in-button'>
                        <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600"
              >
                Sign In
              </button>
                    </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
