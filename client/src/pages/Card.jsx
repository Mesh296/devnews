import React, { useEffect, useState } from 'react';

export const Card = ({ title, content, author, categories, createdAt, updatedAt, onClick, originalUrl }) => {

    const timeAgo = (date) => {
        const now = new Date();
        const past = new Date(date)
        const seconds = Math.floor((now - past) / 1000)

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 },
        ];

        for (let interval of intervals) {
            console.log(interval.seconds)
            const count = Math.floor(seconds / interval.seconds)
            if (count > 0) {
                return `${count} ${interval.label}${count == 1 ? '' : 's'} ago`
            }
        }

        return 'just now'
    }


    return (
        <div onClick={onClick} className="cursor-pointer">
            <p> <span className='font-semibold'>@{author}</span> <span className='text-xs pl-2 text-element-secondary'>{timeAgo(createdAt)}</span></p>
            <a className="block p-6 bg-on-surface-1 transition-all duration-200 rounded-lg mt-2 hover:bg-on-surface-1-hover">
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-element-primary ">{title}</h5>
                <p className="font-normal text-element-primary ">{content}</p>

                <div className="flex justify-between items-center mt-8 text-sm text-element-primary">
                    <p>
                        {
                            categories.map((category, index) => {
                                return (<span key={index} className='bg-on-surface-2 mr-2 px-2 py-1 text-sm rounded-full'>
                                    {category.name}
                                </span>)
                            })
                        }
                    </p>
                    <div className='flex items-center gap-2'>
                        <p className='text-element-secondary text-xs'>Read more</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-element-secondary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </div>
                </div>
            </a>
            <hr className="h-px my-8 bg-gray-200 border-0" />
        </div>
    );
};