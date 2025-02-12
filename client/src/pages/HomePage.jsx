import React, { useState, useRef, useEffect } from 'react';
import { Card } from './Card';
import { Sidebar } from '../components/Sidebar';
import { Modal, Button } from 'flowbite-react';
import { getAllPost } from '../services/posts/postService';
import { useAuth } from '../context/AuthProvider';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPost();
        console.log(data)
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [])

  const handleDeletePost = (deletedPostId) => {
    setPosts(posts.filter(post => post.id !== deletedPostId));
  };

  return (
    <div>

      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full p-4 max-w-3xl">
          {posts.map((post, index) => (
            <Card
              key={index}
              postId={post.id}
              title={post.title}
              content={post.description}
              author={post.author}
              categories={post.categories}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              originalUrl={post.originalUrl}
              onClick={() => setSelectedCard(post)} // Gửi dữ liệu Card tới Modal
              currentUserId={user?.id || null}
              onDelete={handleDeletePost}
              voteSummary={post.voteSummary}
              comments={post.comments}
            />
          ))}
        </div>
      </div>
    </div>
  );
};