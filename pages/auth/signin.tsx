import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@mui/material';
import Navbar from '@/components/Navbar';
import axios from 'axios';

interface ApiResponse {
    token: string;
    error?: string;
}

const signIn = async (email: string, password: string) => {
    try {
        const response = await axios.post<ApiResponse>('/api/auth/signin', {
            email,
            password,
        });

        const data = response.data;

        if (response.status === 200) {
            const { token } = data;
            localStorage.setItem('token', token);
            return true;
        } else {
            console.error(data.error);
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

const Signin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            router.push('/chat');
        }
    }, [router]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await signIn(email, password);
        if (success) {
            router.push('/chat');
        }
    };
    return (
        <>
        <Navbar/>
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSignIn}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-2 text-xs text-center text-gray-700" > </p>
                    New to ChatFire ?{' '}
                    <Link href="/auth/signup">
                        <Button variant="contained" color="primary" fullWidth >
                            Sign Up
                        </Button>
                    </Link>
               
            </div>
        </>
    );
};

export default Signin