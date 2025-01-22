import React, { useRef, useEffect, useState } from 'react'
import { Button, Modal } from "flowbite-react";

export const PostModal = () => {
    const [openModal, setOpenModal] = useState(false);

    const modalRef = useRef(null)

    const handleClickOutside = (event) => {
        // Nếu click xảy ra ngoài Sidebar
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setOpenModal(false); // Đóng Sidebar
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

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)} ref={modalRef}>

                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6" >
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                            companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                            soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color='dark' onClick={() => setOpenModal(false)}>Read post</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
