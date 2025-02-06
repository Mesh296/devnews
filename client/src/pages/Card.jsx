import React, { useEffect, useState } from 'react';
import { deletePost } from '../services/posts/postService';

export const Card = ({ postId, title, content, author, categories, createdAt, updatedAt, onClick, originalUrl, currentUserId, onDelete }) => {

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
            const count = Math.floor(seconds / interval.seconds)
            if (count > 0) {
                return `${count} ${interval.label}${count == 1 ? '' : 's'} ago`
            }
        }

        return 'just now'
    }

    const [showMenu, setShowMenu] = useState(false)
    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await deletePost(postId);
            onDelete(postId);
        } catch (error) {
            console.error("Delete error:", error);
        }
        setShowMenu(false);
    };


    return (
        <div onClick={onClick} className="cursor-pointer">
            {/* Menu Dropdown */}
            {author.id === currentUserId && (
                <div className="absolute right-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                        className="p-1 hover:bg-on-surface-1-hover rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>


                    </button>

                    {showMenu && (
                        <div
                            className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={handleDelete}
                                className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}

            <p> <span className='font-semibold'>@{author.username}</span> <span className='text-xs pl-2 text-element-secondary'>{timeAgo(createdAt)}</span></p>
            <div>

                <a className="block p-6 bg-on-surface-1 transition-all duration-200 rounded-lg mt-2 hover:bg-on-surface-1-hover">
                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-element-primary ">{title}</h5>
                    <p className="font-normal text-element-primary ">{content}</p>

                    {/* Categories */}
                    <div className="flex justify-between items-center mt-8 text-sm text-element-primary">
                        <div className='flex flex-wrap overflow-hidden'>  {/* Removed flex-1 */}
                            {
                                categories?.map((category, index) => {
                                    return (
                                        <span key={index} className='bg-on-surface-2 mr-2 mb-2 px-2 py-1 text-sm rounded-full whitespace-nowrap'>
                                            {category.name}
                                        </span>
                                    )
                                })
                            }
                        </div>

                        <div className='flex items-center gap-2 flex-shrink-0 ml-4'>
                            <p className='text-element-secondary text-xs'>Read more</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-element-secondary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                    </div>
                </a>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0" />
        </div>
    );
};