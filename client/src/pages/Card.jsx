import React, { useEffect, useState, useRef } from 'react';
import { deletePost } from '../services/posts/postService';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import { votePost, unvotePost, updateVote, getUserVote } from '../services/posts/voteService';
import { Modal } from 'flowbite-react';

export const Card = ({ postId, title, content, author, categories, createdAt, updatedAt, originalUrl, currentUserId, onDelete, voteSummary, comments }) => {
    const [userVote, setUserVote] = useState(null); // 'up', 'down', or null
    const [votes, setVotes] = useState(voteSummary);
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false); // New state for modal visibility
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchUserVote = async () => {
            try {
                const vote = await getUserVote(postId);
                setUserVote(vote || null);
                console.log("user voted for this post: ", vote)
            } catch (error) {
                console.error("Error fetching user vote:", error);
            }
        };
        fetchUserVote();
    }, [postId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false); // Close Modal
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleVote = async (e, voteType) => {
        e.stopPropagation();
        try {
            if (userVote == voteType) {
                await unvotePost(postId);
                setUserVote(null);
                setVotes({
                    ...votes,
                    upvotes: voteType === 'up' ? votes.upvotes - 1 : votes.upvotes,
                    downvotes: voteType === 'down' ? votes.downvotes - 1 : votes.downvotes,
                });
            } else if (userVote == null) {
                await votePost(postId, voteType);
                setUserVote(voteType);
                setVotes({
                    ...votes,
                    upvotes: voteType == 'up' ? votes.upvotes + 1 : votes.upvotes,
                    downvotes: voteType == 'down' ? votes.downvotes + 1 : votes.downvotes,
                });
            } else {
                await updateVote(postId, voteType);
                setUserVote(voteType);
                setVotes({
                    upvotes: voteType === 'up' ? votes.upvotes + 1 : votes.upvotes - 1,
                    downvotes: voteType === 'down' ? votes.downvotes + 1 : votes.downvotes - 1,
                });
            }
        } catch (error) {
            console.error("Vote error:", error);
        }
    };

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

    const handleDeletePost = async (e) => {
        e.stopPropagation();
        try {
            await deletePost(postId);
            onDelete(postId);
        } catch (error) {
            console.error("Delete error:", error);
        }
        setShowMenu(false);
    };

    const getDropdownArrowClass = () => {
        return showMenu ? "rotate-180" : "";
    };

    const toggleModal = (e) => {
        e.stopPropagation();
        setShowModal(!showModal);
    };

    return (
        <>
            <div onClick={toggleModal} className="cursor-pointer">
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <p className='flex-grow'>
                            <span className='font-semibold'>@{author.username}</span> <span className='text-xs pl-2 text-element-secondary'>{timeAgo(createdAt)}</span>
                        </p>
                        {author.id === currentUserId && (
                            <div className="relative shrink-0">
                                <div className='relative'>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowMenu(!showMenu);
                                        }}
                                        className="p-1 hover:bg-on-surface-1-hover rounded-full"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 transition-transform duration-200 ${getDropdownArrowClass()}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                    {showMenu && (
                                        <div
                                            className=" absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 origin-top-right"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={handleDeletePost}
                                                className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='bg-on-surface-1 hover:bg-on-surface-1-hover rounded-lg block p-6  transition-all duration-200  mt-2 '>
                        <a className="">
                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-element-primary ">{title}</h5>
                            <p className="font-normal text-element-primary whitespace-nowrap overflow-hidden text-ellipsis">{content}</p>

                            <div className="flex justify-between items-center mt-8 text-sm text-element-primary">
                                <div className='flex flex-wrap overflow-hidden'>
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
                        {/* Vote Summary and Comments */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                                <button onClick={(e) => handleVote(e, 'up')} className={`flex items-center hover:text-green-600 ${userVote == 'up' ? 'text-green-600' : ''}`}>
                                    <FaArrowUp className="mr-1" />
                                    <span>{votes.upvotes}</span>
                                </button>
                                <button onClick={(e) => handleVote(e, 'down')} className={`flex items-center hover:text-red-600 ${userVote == 'down' ? 'text-red-600' : ''}`}>
                                    <FaArrowDown className="mr-1" />
                                    <span>{votes.downvotes}</span>
                                </button>
                            </div>
                            <div className="flex items-center">
                                <FaComment className="mr-1" />
                                <span>{comments.length} Comments</span>
                            </div>
                        </div>
                    </div>
                    <hr className="h-px my-8 bg-gray-200 border-0" />
                </div>
            </div>

            <Modal show={showModal} onClose={toggleModal} ref={modalRef}>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    <div className=" text-sm text-element-secondary ">
                        <div className='flex justify-between'>
                            <p><strong>@{author.username}</strong> </p>
                            <p className='mr-4'>Created at: {new Date(createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className='mt-2'>{content}</p>
                        <p className='mt-4'><strong>Categories:</strong> {
                            categories.map((category, index) => {
                                return (<span key={index}>
                                    {category.name}
                                    {index < categories.length - 1 ? ", " : ""}
                                </span>)
                            })
                        }
                        </p>
                    </div>

                    <div className="flex items-center justify-start mt-4">
                        <div className="flex items-center space-x-3">
                            <button onClick={(e) => handleVote(e, 'up')} className={`flex items-center hover:text-green-600 ${userVote == 'up' ? 'text-green-600' : ''}`}>
                                <FaArrowUp className="mr-1" />
                                <span>{votes.upvotes}</span>
                            </button>
                            <button onClick={(e) => handleVote(e, 'down')} className={`flex items-center hover:text-red-600 ${userVote == 'down' ? 'text-red-600' : ''}`}>
                                <FaArrowDown className="mr-1" />
                                <span>{votes.downvotes}</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h6 className="font-semibold text-sm text-element-primary">Comments:</h6>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="mb-2 p-3 bg-gray-100 rounded">
                                    <p className="text-sm text-element-primary"><strong>{comment.author.fullName}:</strong> {comment.body}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-element-secondary">No comments yet.</p>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className=''>
                        <a  href={originalUrl.startsWith('http') ? originalUrl : `https://${originalUrl}`} target='_blank'>
                            <button className="flex items-center px-3 py-2 text-xs laptop:px-3 laptop:py-2 laptop:text-sm bg-brand-color cursor-pointer text-dark-element-primary rounded-[7px] hover:bg-surface hover:text-element-primary border-2 border-transparent hover:border-brand-color transition-all duration-200" type="button">
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                                    <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};