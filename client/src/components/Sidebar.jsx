import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const { user, logoutUser } = useAuth();

    return (
        <div className="fixed pt-16 bottom-0 left-0 w-full laptop:top-0 laptop:left-0 laptop:w-20 laptop:h-screen z-40">
            <aside 
                id="separator-sidebar" 
                className="h-14 laptop:h-full bg-surface transition-transform"
                aria-label="Sidebar"
            >
                <div className="h-full flex laptop:items-center px-3 laptop:pb-32 overflow-y-auto">
                    {/* Changed ul to horizontal layout on mobile */}
                    <ul className="flex flex-row laptop:flex-col justify-around laptop:justify-normal w-full laptop:space-y-6 space-x-4 laptop:space-x-0 font-medium text-sm">
                        {/* Home Icon */}
                        <li className='laptop:py-2'>
                            <Link to="/" className="flex items-center justify-center">
                                <div className="p-2 laptop:p-3 hover:bg-on-surface-1-hover transition-all duration-200 rounded-xl group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-7 text-gray-400 group-hover:text-element-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </div>
                            </Link>
                        </li>

                        {/* Add Icon */}
                        <li className='laptop:py-2'>
                            <Link to="/createPost" className="flex items-center justify-center">
                                <div className="p-2 laptop:p-3 hover:bg-on-surface-1-hover transition-all duration-200 rounded-xl group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8 text-gray-400 group-hover:text-element-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>
                            </Link>
                        </li>

                        {/* Logout Icon */}
                        <li className='laptop:py-2'>
                            <Link onClick={logoutUser} className="flex items-center justify-center">
                                <div className="p-2 laptop:p-3 hover:bg-on-surface-1-hover transition-all duration-200 rounded-xl group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8 text-gray-400 group-hover:text-element-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};