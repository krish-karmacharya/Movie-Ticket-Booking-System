import React from 'react';
import Header from '../components/Nav';
import CreateAccountForm from './CreateAccountForm';
const SignInForm = () => {
    return (<>
        <Header />
        <div className="bg-gray-900 text-gray-300 p-8 rounded-lg max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-white mb-2">Sign in to your account</h1>
            <p className="text-sm mb-6">
                Join our community of designers and developers to get access to hundreds of UI components, plugins, resources, and design systems.
            </p>

            <form>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="name@company.com"
                        className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
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
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Sign in to account
                </button>
            </form>

            <p className="mt-4 text-sm">
                Not registered?{' '}
                <NavLink to="/CreateAccountForm" className="text-blue-500 hover:underline">
                    Create an account
                </NavLink>
            </p>
        </div>
    </>);
};

export default SignInForm;
