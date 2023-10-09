import { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@mui/material';
import Navbar from '@/components/Navbar';

const Signup: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [allData, setAllData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null); 
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const router = useRouter();
  console.log(process.env.NEXT_PUBLIC_CLOUDINARY,"ppppppppp");
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      // router.push('/profile');
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAllData({ ...allData, [name]: value });
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      setError("Please select an image");
      return;
    }
  
    const formData1 = new FormData();
  
    // Append the selected image to the form data with a unique name
    formData1.append("file", selectedImage);
  
    formData1.append("upload_preset", "my-uploads");
    if (!allData.firstname || !allData.email || !allData.password) {
      setError("all fields are required*");
      return;
    }
  
    const uploadImage = async () => {
      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY}/image/upload`,
        {
          method: "POST",
          body: formData1, 
        }
      ).then((res) => res.json());
  
      console.log(data, "datatatattatat");
      return data.secure_url;
    };
  
    const fileUrl = await uploadImage();
  console.log(fileUrl,"fileUrlfileUrlfileUrl");
  
    try {
      const { firstname, lastname, email, password } = allData;
      const res = await axios.post('/api/auth/register', {
        firstname,
        lastname,
        email,
        password,
        fileUrl
      });
  
      const token = res.data?.token;
  
      if (token) {
        localStorage.setItem('token', token);
        router.push('/chat');
      } else {
        setError('An error occurred during signup');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during signup');
    }
  };
  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]; // Use optional chaining to safely access e.target
  
    if (file) {
      setSelectedImage(file);
  
      // Generate a preview of the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string); // Use optional chaining to safely access e.target
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <>
      <Navbar />
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
            <div className="App">
        <button
          onClick={() => {
            console.log(inputRef);
            inputRef?.current?.click();
          }}
          className="super-btn"
        >
          Upload profile
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*" 
          onChange={handleImageChange}
          hidden
        />
       {imagePreview && (
  <div className="round-image-preview">
    <img src={imagePreview} alt="Image Preview" />
  </div>
)}
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
