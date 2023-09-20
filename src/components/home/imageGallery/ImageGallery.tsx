// BASE WORKING
import { imagesData } from "../../../utils/data";
import { imageData } from "../../../utils/interfaces";
import "./imageGallery.css";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
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
    </main>
  );
};

export default ImageGallery;

// * WORKING BEATIFY
// import { imagesData } from "../../../utils/data";
// import { imageData } from "../../../utils/interfaces";
// import "./imageGallery.css";
// import Skeleton from "react-loading-skeleton";
// import { useEffect, useState } from "react";
// import "react-loading-skeleton/dist/skeleton.css";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// type ImageGalleryProps = {
//   selectedTag: string;
// };

// const ImageItem = ({ path, tag }: imageData) => {
//   return (
//     <article className="image__item">
//       <div>
//         <img src={path} alt={`${tag} image`} />
//       </div>
//       <p>{tag}</p>
//     </article>
//   );
// };

// const ImageGallery = ({ selectedTag }: ImageGalleryProps) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [images, setImages] = useState(imagesData);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   }, [selectedTag]);

//   const filteredImages = imagesData.filter(
//     (image) => image.tag === selectedTag
//   );

//   const onDragEnd = (result: any) => {
//     if (!result.destination) {
//       return;
//     }

//     const reorderedImages = Array.from(images);
//     const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
//     reorderedImages.splice(result.destination.index, 0, reorderedItem);

//     setImages(reorderedImages);
//   };

//   useEffect(() => {
//     console.log(filteredImages);
//   }, [selectedTag]);

//   const renderImages = () => {
//     if (isLoading) {
//       return imagesData.map((imageData: imageData, index: number) => (
//         <Skeleton key={imageData.path} height={400} />
//       ));
//     } else if (selectedTag === "") {
//       return (
//         <Droppable droppableId="image-gallery" direction="horizontal">
//           {(provided) => (
//             <div
//               className="container imageGallery__container"
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               {images.map((imageData: imageData, index: number) => (
//                 <Draggable
//                   key={imageData.path}
//                   draggableId={`image-${imageData.path}`}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                     >
//                       <ImageItem {...imageData} />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       );
//     }
//     if (selectedTag !== "") {
//       return (
//         <Droppable droppableId="image-gallery" direction="horizontal">
//           {(provided) => (
//             <div
//               className="container imageGallery__container"
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               {images.map((imageData: imageData, index: number) => (
//                 <Draggable
//                   key={imageData.path}
//                   draggableId={`image-${imageData.path}`}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                     >
//                       <ImageItem {...imageData} />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       );
//     }
//   };

//   return (
//     <main className="imageGallery__main">
//       <DragDropContext onDragEnd={onDragEnd}>{renderImages()}</DragDropContext>
//     </main>
//   );
// };

// export default ImageGallery;
