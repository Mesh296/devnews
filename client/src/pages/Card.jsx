import React, { useState } from 'react';

export const Card = ({ title, content, author, categories, createdAt, updatedAt, onClick, originalUrl }) => {

    return (
        <div onClick={onClick} className="cursor-pointer">
            <p>@{author}</p>
            <a className="block p-6 bg-on-surface-1 transition-all duration-200 rounded-lg  hover:bg-on-surface-1-hover">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-element-primary ">{title}</h5>
                <p className="font-normal text-element-primary ">{content}</p>
                <div className="mt-4 text-sm text-element-primary">
                    <p><strong>Categories:</strong> {
                        categories.map((category, index) => { 
                            return (<span key={index}>
                                {category.name}
                                {index < categories.length - 1 ? ", " : ""}
                            </span>)
                        })
                    }</p>
                    <p><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
                    <p><strong>Updated At:</strong> {new Date(updatedAt).toLocaleDateString()}</p>
                    <p><strong>Link to post:</strong> {originalUrl}</p>
                </div>
            </a>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
    );
};