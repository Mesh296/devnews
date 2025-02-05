import React, { useState, useRef, useEffect } from 'react';
import { Card } from './Card';
import { Sidebar } from '../components/Sidebar';
import { Modal, Button } from 'flowbite-react';
import { getAllPost } from '../services/posts/postService';

export const HomePage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [posts, setPosts] = useState([]);

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    // Nếu click xảy ra ngoài Sidebar
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSelectedCard(null); // Đóng Sidebar
    }
  };

  useEffect(() => {
    // Thêm sự kiện lắng nghe khi component được render
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Hủy sự kiện khi component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
  }, [])

  return (
    <div>

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
              <p>
                        {
                            selectedCard.categories.map((category, index) => {
                                return (<span key={index} className='bg-on-surface-2 mr-2 px-2 py-1 text-sm rounded-full'>
                                    {category.name}
                                </span>)
                            })
                        }
                    </p>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};