import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

export default function Footer({ onLoginClick }) {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
  };

  const handleLoginClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    console.log('Login clicked!', onLoginClick); // Debug log
    if (onLoginClick) {
      onLoginClick();
    }
  };
  



   
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Exclusive Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Exclusive</h3>
            <p className="text-base font-medium">Subscribe</p>
            <p className="text-sm">Get 10% off your first order</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border border-white rounded px-4 py-2.5 pr-12 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition-opacity"
                aria-label="Subscribe"
              >
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Support</h3>
            <address className="not-italic space-y-3 text-sm">
              <p>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
              <p>
                <a href="mailto:exclusive@gmail.com" className="hover:underline">
                  exclusive@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+88015888889999" className="hover:underline">
                  +88015-88888-9999
                </a>
              </p>
            </address>
          </div>

          {/* Account Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Account</h3>
            <nav>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="/login" onClick={handleLoginClick} className="hover:underline cursor-pointer">
                    Login / Register
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cart
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Shop
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Quick Link Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Link</h3>
            <nav>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social Media Icons */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Socials</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>


        {/* Copyright Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-400">
            © Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
