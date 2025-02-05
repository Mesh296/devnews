import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../services/users/userService';
import { useAuth } from '../context/AuthProvider';
import { PrimaryButton } from '../components/PrimaryButton';
import { getAllPost } from '../services/posts/postService';
import { Card } from './Card';
import { Modal, Button } from 'flowbite-react';

export const ProfilePage = () => {
  const { username } = useParams(); // Extract username from URL
  const [userInfo, setUserInfo] = useState(null); // State to store user info
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(''); // State to handle errors
  const [selectedCard, setSelectedCard] = useState(null);
  const [posts, setPosts] = useState([]);

  const { user, logoutUser } = useAuth();
  const modalRef = useRef(null);
  
  const handleClickOutside = (event) => {
    // Nếu click xảy ra ngoài Sidebar
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSelectedCard(null); // Đóng Sidebar
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getUserInfo(username); // Fetch user info
        setUserInfo(data);
      } catch (error) {
        setError('Failed to fetch user information. Please try again later.');
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const data = await getAllPost();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchUser();
    fetchPosts();
  }, [username]);

  useEffect(() => {
    // Thêm sự kiện lắng nghe khi component được render
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Hủy sự kiện khi component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // load card
  
  // Render user info
  return (
    <div className="min-h-screen flex flex-col items-center mt-10">
      <div className='border rounded-xl border-b-0 min-h-screen p-6 w-full max-w-3xl'>
        <div className='flex justify-between space-x-32'>
          {/* info */}
          <div>
            <p className='font-semibold text-xl'>@{userInfo.username}</p>
            <p>{userInfo.fullName}</p>
            <PrimaryButton text='Edit Profile' className={`mt-12 laptop:py-1`}/>
          </div>
          {/* image */}
          <div>
            <img class="rounded-full w-36 h-36" src="docs/images/cat.jpg" alt="image description" />
            
          </div>
        </div>
        <div className='flex justify-center mt-10 font-semibold text-element-primary'>
          <p>Post</p>
        </div>
        <hr className="h-px my-2 bg-gray-200 border-0" />

        {/* Post */}
        <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="w-full p-4 max-w-3xl">
                  {posts.map((post, index) => (
                    <Card
                      key={index}
                      title={post.title}
                      content={post.description}
                      author={post.author.username}
                      categories={post.categories}
                      createdAt={post.createdAt}
                      updatedAt={post.updatedAt}
                      originalUrl={post.originalUrl}
                      onClick={() => setSelectedCard(post)} // Gửi dữ liệu Card tới Modal
                    />
                  ))}
                </div>
        
                {/* Modal hiển thị nội dung của Card */}
                {selectedCard && (
                  <Modal show={!!selectedCard} onClose={() => setSelectedCard(null)} ref={modalRef}>
                    <Modal.Header>{selectedCard.title}</Modal.Header>
                    <Modal.Body>
                      <p>{selectedCard.content}</p>
                      <div className="mt-4 text-sm text-gray-600">
                        <p><strong>Author:</strong> {selectedCard.author.username}</p>
                        <p><strong>Categories:</strong> {
                          selectedCard.categories.map((category, index) => {
                            return (<span key={index}>
                              {category.name}
                              {index < selectedCard.categories.length - 1 ? ", " : ""}
                            </span>)
                          })
                        }</p>
                        <p><strong>Created At:</strong> {new Date(selectedCard.createdAt).toLocaleDateString()}</p>
                        <p><strong>Updated At:</strong> {new Date(selectedCard.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                  </Modal>
                )}
              </div>
      </div>
    </div>
  );
};
