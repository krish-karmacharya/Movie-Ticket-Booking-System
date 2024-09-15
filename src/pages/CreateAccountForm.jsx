import React, { useState } from 'react';
import Nav from '../components/Nav';
import { NavLink } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';

const CreateAccountForm = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '', acceptTerms: false
    });
    const [errors, setErrors] = useState({});
    const { loginWithRedirect } = useAuth0();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'Required';
        if (!formData.lastName) newErrors.lastName = 'Required';
        if (!formData.email) newErrors.email = 'Required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.password) newErrors.password = 'Required';
        else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.acceptTerms) newErrors.acceptTerms = 'Must accept terms';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
            // Here you would typically send the data to your backend
        }
    };

    const handleGoogleSignUp = () => {
        loginWithRedirect({
            connection: 'google-oauth2',
            screen_hint: 'signup'
        });
    };

    return (
        <>
            <Nav />
            <div className="p-3 md:p-8 max-w-md mx-auto mt-16 mb-20">
                <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-white mb-4">Create an account</h1>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map(field => (
                            <div key={field} className="mb-2">
                                <label htmlFor={field} className="block text-sm font-medium mb-1">
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <input
                                    type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field] ? 'border-red-500' : ''}`}
                                    placeholder={`Enter your ${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}`}
                                />
                                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                            </div>
                        ))}

                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className={`mr-2 rounded bg-gray-800 border-gray-600 focus:ring-blue-500 ${errors.acceptTerms ? 'border-red-500' : ''}`}
                            />
                            <label htmlFor="acceptTerms" className="text-xs">
                                I accept the <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a>
                            </label>
                        </div>
                        {errors.acceptTerms && <p className="text-red-500 text-xs mt-0.5 mb-2">{errors.acceptTerms}</p>}

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-300 mb-2">
                            Create account
                        </button>

                        <button type="button" onClick={handleGoogleSignUp} className="w-full bg-white text-gray-900 py-2 px-4 rounded-md text-sm font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center transition duration-300">
                            <FaGoogle className="mr-2" />
                            Sign up with Google
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        Already have an account? <NavLink to="/SignInForm" className="text-blue-500 hover:underline font-medium">Login here</NavLink>
                    </p>
                </div>
            </div>

        </>
    );
};

export default CreateAccountForm;