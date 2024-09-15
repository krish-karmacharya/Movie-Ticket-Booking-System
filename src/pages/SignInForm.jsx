import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from '../components/Nav';
import { FaGoogle } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { loginWithRedirect } = useAuth0();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', { email, password, rememberMe });
    };

    const handleGoogleSignIn = () => {
        loginWithRedirect({
            connection: 'google-oauth2'
        });
    };

    return (
        <>
            <Nav />
            <div className="p-40 pb-10">
                <div className="bg-gray-900 text-gray-300 p-8 rounded-lg max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-white mb-2">Sign in to your account</h1>
                    <p className="text-sm mb-6">
                        Welcome back! Please enter your details to access your account.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Your password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="mr-2 rounded bg-gray-800 border-gray-600 focus:ring-blue-500"
                                />
                                <label htmlFor="remember" className="text-sm">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-blue-500 hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 mb-4"
                        >
                            Sign in to account
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full bg-white text-gray-900 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center"
                        >
                            <FaGoogle className="mr-2" />
                            Sign in with Google
                        </button>
                    </form>

                    <p className="mt-4 text-sm">
                        Not registered?{' '}
                        <NavLink to="/CreateAccountForm" className="text-blue-500 hover:underline">
                            Create an account
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignInForm;
