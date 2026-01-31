import React, { useState } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import { usePixabay } from "./hooks/usePixabay";

const API_KEY = "50870549-e725e8370144de5641f01ffe4";

const App = () => {
  const { images, loading, page, query, setQuery, nextPage } =
    usePixabay(API_KEY);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleSearchSubmit = (newQuery) => setQuery(newQuery);
  const handleLoadMore = () => nextPage();
  const openModal = (largeImageURL) => {
    setModalImage(largeImageURL);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {!loading && images.length > 0 && <Button onClick={handleLoadMore} />}
      {showModal && <Modal image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
