import { imagesData } from "../../../utils/data";
import { imageData } from "../../../utils/interfaces";
import "./imageGallery.css";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";

type ImageGalleryProps = {
  selectedTag: string;
};

const ImageItem = ({ path, tag }: imageData) => {
  return (
    <article className="image__item">
      <div>
        <img src={path} alt={`${tag} image`} />
      </div>
      <p>{tag}</p>
    </article>
  );
};

const ImageGallery = ({ selectedTag }: ImageGalleryProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedTag]);

  const filteredImages = imagesData.filter(
    (image) => image.tag === selectedTag
  );

  const renderImages = () => {
    if (isLoading) {
      return imagesData.map((imageData: imageData) => (
        <Skeleton key={imageData.path} height={400} />
      ));
    } else if (selectedTag === "") {
      return imagesData.map((imageData: imageData) => (
        <ImageItem key={imageData.path} {...imageData} />
      ));
    } else if (selectedTag !== "") {
      return filteredImages.map((imageData: imageData) => (
        <ImageItem key={imageData.path} {...imageData} />
      ));
    }
  };

  useEffect(() => {
    console.log(filteredImages);
  }, [filteredImages]);

  return (
    <main className="imageGallery__main">
      <div className="container imageGallery__container">{renderImages()}</div>
      {/* <Skeleton /> */}
    </main>
  );
};

export default ImageGallery;
