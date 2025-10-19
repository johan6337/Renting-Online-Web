import React, { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const SignUpPage = ({ onBack, onLoginClick, onSignUpClick, onProfileClick, onAdminClick }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SignUp submitted:', formData);
    // Handle signup logic here
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up clicked');
    // Handle Google signup logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} onProfileClick={onProfileClick} onAdminClick={onAdminClick} />

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-160px)]">
        {/* Left Side - Image */}
        <div className="flex-1 bg-gradient-to-br from-purple-100 to-pink-200 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=900&q=80" 
            alt="Shopping bags and lifestyle"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side - SignUp Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                Create an account
              </h2>
              <p className="text-gray-600">Enter your details below</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email or Phone Number"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
                  required
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-12 rounded-md transition-colors"
                >
                  Create Account
                </button>

                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-12 rounded-md transition-colors"
                >
                  <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
                  Sign up with Google
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have account?{" "}
                <button
                  onClick={onLoginClick}
                  className="text-red-500 hover:text-red-600 underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onLoginClick={onLoginClick} />
    </div>
  );
};

export default SignUpPage;