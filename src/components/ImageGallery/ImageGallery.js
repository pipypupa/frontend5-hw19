import React, { useMemo } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import "./ImageGallery.css";

const ImageGallery = ({ images, onImageClick }) => {
  const galleryItems = useMemo(
    () =>
      images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClick={() => onImageClick(image.largeImageURL)}
        />
      )),
    [images, onImageClick]
  );

  return <ul className="gallery">{galleryItems}</ul>;
};

export default ImageGallery;
