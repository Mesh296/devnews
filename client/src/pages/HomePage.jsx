import React, { useState, useRef, useEffect } from 'react';
import { Card } from './Card';
import { Sidebar } from '../components/Sidebar';
import { Modal, Button } from 'flowbite-react';

export const HomePage = () => {
  const [selectedCard, setSelectedCard] = useState(null); // Lưu thông tin Card hiện tại
  const modalRef = useRef(null)

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

  const cards = [
    { title: 'Card 1', content: 'This is content for card 1' },
    { title: 'Card 2', content: 'This is content for card 2' },
    { title: 'Card 3', content: 'This is content for card 3' },
    // Thêm nhiều card hơn nếu cần
  ];

  return (
    <div>
      <Sidebar />
      <div className="p-4 laptop:ml-64 grid grid-cols-1 gap-1 tablet:grid-cols-2 desktop:grid-cols-3 desktop:px-32 laptop:gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            content={card.content}
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
          </Modal.Body>
          <Modal.Footer>
            <Button color='dark' onClick={() => setSelectedCard(null)}>Read post</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
