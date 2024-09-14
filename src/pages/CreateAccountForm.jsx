import React from 'react';

const CreateAccountForm = () => {
    return (
        <div className="bg-gray-900 text-gray-300 p-8 rounded-lg max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
            <p className="text-sm mb-6">
                Join our community of designers and developers to get access to hundreds of UI components, plugins, resources, and design systems.
            </p>

            <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                            First name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="John"
                            className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                            Last name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Doe"
                            className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

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

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="terms"
                        className="mr-2 rounded bg-gray-800 border-gray-600 focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm">
                        I accept the{' '}
                        <a href="#" className="text-blue-500 hover:underline">
                            Terms and Conditions
                        </a>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Create account
                </button>
            </form>

            <p className="mt-4 text-sm">
                Already have an account?{' '}
                <a href="#" className="text-blue-500 hover:underline">
                    Login here
                </a>
            </p>
        </div>
    );
};

export default CreateAccountForm;