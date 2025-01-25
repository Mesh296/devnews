import React from 'react';

export const Card = ({ title, content, author, categories, createdAt, updatedAt, onClick }) => {
    return (
        <div onClick={onClick} className="cursor-pointer">
            <a className="block p-6 bg-white border border-t-0 border-gray-200 transition-all duration-200 rounded-lg  hover:bg-gray-100">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{title}</h5>
                <p className="font-normal text-gray-700 ">{content}</p>
                <div className="mt-4 text-sm text-gray-600">
                    <p><strong>Author:</strong> {author}</p>
                    <p><strong>Categories:</strong> {categories.join(', ')}</p>
                    <p><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                    <p><strong>Updated At:</strong> {new Date(updatedAt).toLocaleDateString()}</p>
                </div>
            </a>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
    );
};