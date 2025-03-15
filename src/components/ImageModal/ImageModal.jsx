import React, { useEffect } from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.overlay}
      className={css.modal}
      contentLabel="Image Modal"
    >
      <div className={css.imageWrapper}>
        <img
          src={image.urls.regular}
          alt={image.alt_description || "Image"}
          className={css.modalImage}
        />
        <div className={css.imageInfo}>
          <p className={css.imageTitle}>{image.alt_description}</p>
          <p className={css.imageAuthor}>
            <strong>Автор:</strong> {image.user.name}
          </p>
          <p className={css.imageStats}>
            <strong>Лайки:</strong> {image.likes}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
