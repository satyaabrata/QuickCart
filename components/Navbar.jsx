"use client"
import React, { useState } from "react";
import { assets, BagIcon, CartIcon, my_cart } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>
        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Desktop User Section */}
      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={my_cart}
                  onClick={() => router.push('/cart')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={BagIcon}
                  onClick={() => router.push('/my-orders')}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      {/* Mobile Menu */}
      <div className="flex items-center md:hidden gap-3">
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.menu_icon} alt="menu icon" className="w-6 h-6" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="flex flex-col p-2">
                <Link
                  href="/"
                  className="px-4 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/all-products"
                  className="px-4 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/"
                  className="px-4 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/"
                  className="px-4 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                {isSeller && (
                  <button
                    onClick={() => {
                      router.push('/seller');
                      setIsMenuOpen(false);
                    }}
                    className="text-xs border px-4 py-1.5 rounded-full mt-2"
                  >
                    Seller Dashboard
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile User Section */}
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={CartIcon}
                  onClick={() => router.push('/cart')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={BagIcon}
                  onClick={() => router.push('/my-orders')}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;