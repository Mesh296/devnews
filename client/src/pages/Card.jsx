import React from 'react';

export const Card = ({ title, content, onClick }) => {
    return (
        <div onClick={onClick} className="cursor-pointer">
            <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{content}</p>
            </a>
        </div>
    );
};
