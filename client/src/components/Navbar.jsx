import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const { user, logoutUser } = useAuth();


    const username = user ? user.username : null;


    return (
        <nav className=" backdrop-blur-sm bg-opacity-70 bg-surface border-gray-200 drop-shadow-sm sticky top-0 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        DEVNEWS
                    </span>
                </Link>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-on-surface-2 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className={` ${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto  `}
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li className="">
                            <Link
                                to="/"
                                className=" block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-element-secondary md:p-0 transition-all duration-200 border-transparent md:border-b-[3px] md:hover:border-element-secondary md:rounded-none md:pb-1"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>

                        </li>
                        <li>
                            <Link
                                to="/About"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-element-secondary md:p-0 transition-all duration-200 border-transparent md:border-b-[3px] md:hover:border-element-secondary md:rounded-none md:pb-1"
                                onClick={toggleMenu}
                            >
                                About
                            </Link>
                        </li>
                        {!user && (
                            <li>
                                <Link
                                    to="/login"
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-element-secondary md:p-0 transition-all duration-200 border-transparent md:border-b-[3px] md:hover:border-element-secondary md:rounded-none md:pb-1"
                                    onClick={toggleMenu}
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                        {!user && (
                            <li>
                                <Link
                                    to="/register"
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-element-secondary md:p-0 transition-all duration-200 border-transparent md:border-b-[3px] md:hover:border-element-secondary md:rounded-none md:pb-1"
                                    onClick={toggleMenu}
                                >
                                    Register
                                </Link>
                            </li>
                        )}
                        {user && (
                            <li>
                                <Link
                                    to={`/${username}`}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-element-secondary md:p-0 transition-all duration-200 border-transparent md:border-b-[3px] md:hover:border-element-secondary md:rounded-none md:pb-1"
                                    
                                >
                                    Profile
                                </Link>

                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
};
