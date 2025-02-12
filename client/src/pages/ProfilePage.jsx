import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../services/users/userService';
import { useAuth } from '../context/AuthProvider';
import { PrimaryButton } from '../components/PrimaryButton';
import { getAllPost, getPostsByUser } from '../services/posts/postService';
import { Card } from './Card';
import { Modal, Button } from 'flowbite-react';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';

export const ProfilePage = () => {
  const { username } = useParams(); // Extract username from URL
  const [userInfo, setUserInfo] = useState(null); // State to store user info
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(''); // State to handle errors
  const [posts, setPosts] = useState([]);

  const { user, logoutUser } = useAuth();

  const handleDeletePost = (deletedPostId) => {
    setPosts(posts.filter(post => post.id !== deletedPostId));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getUserInfo(username);
        setUserInfo(data);
      } catch (error) {
        setError('Failed to fetch user information. Please try again later.');
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  useEffect(() => {
    if (userInfo?.id) {
      const fetchPosts = async () => {
        try {
          const data = await getPostsByUser(userInfo.id);
          setPosts(data);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      };
      fetchPosts();
    }
  }, [userInfo]);

  // Render loading state
  if (loading) {
    return <p>Loading profile...</p>;
  }

  // Render error state
  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-10">
      <div className='border rounded-xl border-b-0 min-h-screen p-6 w-full max-w-3xl'>
        <div className='flex justify-between'>
          {/* info */}
          <div>
            <p className='font-semibold text-xl'>@{userInfo.username}</p>
            <p>{userInfo.fullName}</p>
            <PrimaryButton text='Edit Profile' className={`mt-12 laptop:py-1`} />
          </div>
          {/* image */}
          <div>
            <img className="rounded-full h-36" src="docs/images/cat.jpg" alt="image description" />
          </div>
        </div>
        <div className='flex justify-center mt-10 font-semibold text-element-primary'>
          <p>Post</p>
        </div>
        <hr className="h-px my-2 bg-gray-200 border-0" />

        {/* Post */}
        <div className="min-h-screen flex flex-col items-center">
          <div className="w-full p-4 max-w-3xl">
            {posts.map((post, index) => (
              <Card
                key={index}
                postId={post.id}
                title={post.title}
                content={post.description}
                author={userInfo}
                categories={post.categories}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                originalUrl={post.originalUrl}
                onClick={() => setSelectedCard(post)} // Gửi dữ liệu Card tới Modal
                currentUserId={userInfo.id}
                onDelete={handleDeletePost}
                voteSummary={post.voteSummary}
                comments={post.comments}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
