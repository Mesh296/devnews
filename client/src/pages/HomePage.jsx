import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { getAllPost } from '../services/posts/postService';
import { useAuth } from '../context/AuthProvider';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPost();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = (deletedPostId) => {
    setPosts(posts.filter(post => post.id !== deletedPostId));
  };

  return (
    <div className="min-h-screen bg-surface p-4">
      <div className="max-w-3xl mx-auto">
        <div className='flex justify-center mt-5'>
        <h1 className="text-base font-semibold text-element-primary mb-8">Latest</h1>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              postId={post.id}
              title={post.title}
              content={post.description}
              author={post.author}
              categories={post.categories}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              originalUrl={post.originalUrl}
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