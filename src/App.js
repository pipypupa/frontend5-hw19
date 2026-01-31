import React, { useState } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

import { usePixabay } from "./hooks/usePixabay";

import "./index.css";

const API_KEY = "50870549-e725e8370144de5641f01ffe4"; 
export default function App() {
  const [modalImage, setModalImage] = useState(null);
  const { images, loading, totalHits, searchImages, loadMore, error } =
    usePixabay(API_KEY);

  const openModal = (url) => setModalImage(url);
  const closeModal = () => setModalImage(null);

  const showLoadMore = images.length > 0 && images.length < totalHits;

  return (
    <>
      <Searchbar onSubmit={searchImages} />

      <ImageGallery images={images} onImageClick={openModal} />

      {loading && <Loader />}

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {showLoadMore && !loading && <Button onClick={loadMore} />}

      {modalImage && <Modal image={modalImage} onClose={closeModal} />}
    </>
  );
}
