import React, { useState, useRef, useEffect } from 'react';
import { Card } from './Card';
import { Sidebar } from '../components/Sidebar';
import { Modal, Button } from 'flowbite-react';

export const HomePage = () => {
  const [selectedCard, setSelectedCard] = useState(null); // Lưu thông tin Card hiện tại
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

  // Mock data
  const cards = [
    {
      id: "14aea3a2-919a-466d-9426-d06c6b2c7914",
      title: "Golang basic",
      content: "Golang for beginner",
      author: "321f8070-0384-483b-a20f-5d2bfa3ed090",
      categories: ["golang", "backend"],
      originalUrl: "https://go.dev/",
      createdAt: "2024-12-21T12:13:13.906Z",
      updatedAt: "2024-12-21T12:13:13.906Z"
    },
    {
      id: "24aea3a2-919a-466d-9426-d06c6b2c7915",
      title: "Advanced Golang",
      content: "Deep dive into Golang",
      author: "421f8070-0384-483b-a20f-5d2bfa3ed091",
      categories: ["golang", "advanced"],
      originalUrl: "https://go.dev/advanced",
      createdAt: "2024-12-22T12:13:13.906Z",
      updatedAt: "2024-12-22T12:13:13.906Z"
    },
    {
      id: "34aea3a2-919a-466d-9426-d06c6b2c7916",
      title: "Golang Concurrency",
      content: "Understanding concurrency in Golang",
      author: "521f8070-0384-483b-a20f-5d2bfa3ed092",
      categories: ["golang", "concurrency"],
      originalUrl: "https://go.dev/concurrency",
      createdAt: "2024-12-23T12:13:13.906Z",
      updatedAt: "2024-12-23T12:13:13.906Z"
    },
    {
      id: "44aea3a2-919a-466d-9426-d06c6b2c7917",
      title: "Golang Web Development",
      content: "Building web applications with Golang",
      author: "621f8070-0384-483b-a20f-5d2bfa3ed093",
      categories: ["golang", "web"],
      originalUrl: "https://go.dev/web",
      createdAt: "2024-12-24T12:13:13.906Z",
      updatedAt: "2024-12-24T12:13:13.906Z"
    },
    {
      id: "54aea3a2-919a-466d-9426-d06c6b2c7918",
      title: "Golang Testing",
      content: "Writing tests in Golang",
      author: "721f8070-0384-483b-a20f-5d2bfa3ed094",
      categories: ["golang", "testing"],
      originalUrl: "https://go.dev/testing",
      createdAt: "2024-12-25T12:13:13.906Z",
      updatedAt: "2024-12-25T12:13:13.906Z"
    },
    {
      id: "64aea3a2-919a-466d-9426-d06c6b2c7919",
      title: "Golang Best Practices",
      content: "Best practices for writing Golang code",
      author: "821f8070-0384-483b-a20f-5d2bfa3ed095",
      categories: ["golang", "best-practices"],
      originalUrl: "https://go.dev/best-practices",
      createdAt: "2024-12-26T12:13:13.906Z",
      updatedAt: "2024-12-26T12:13:13.906Z"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* <Sidebar /> */}
      <div className="w-full max-w-3xl">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            content={card.content}
            author={card.author}
            categories={card.categories}
            createdAt={card.createdAt}
            updatedAt={card.updatedAt}
            onClick={() => setSelectedCard(card)} // Gửi dữ liệu Card tới Modal
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
              <p><strong>Author:</strong> {selectedCard.author}</p>
              <p><strong>Categories:</strong> {selectedCard.categories.join(', ')}</p>
              <p><strong>Created At:</strong> {new Date(selectedCard.createdAt).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(selectedCard.updatedAt).toLocaleDateString()}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color='dark' onClick={() => setSelectedCard(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};