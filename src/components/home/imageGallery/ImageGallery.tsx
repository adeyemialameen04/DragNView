// import { imagesData } from "../../../utils/data";
// import { imageData } from "../../../utils/interfaces";
// import "./imageGallery.css";
// import Skeleton from "react-loading-skeleton";
// import { useEffect, useRef, useState } from "react";
// import "react-loading-skeleton/dist/skeleton.css";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

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
//   const [items, setItems] = useState([1, 2, 3]);
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   }, [selectedTag]);

//   const filteredImages = imagesData.filter(
//     (image) => image.tag === selectedTag
//   );

//   const renderImages = () => {
//     if (isLoading) {
//       return imagesData.map((imageData: imageData) => (
//         <Skeleton key={imageData.path} height={400} />
//       ));
//     } else if (selectedTag === "") {
//       return imagesData.map((imageData: imageData) => (
//         <ImageItem key={imageData.path} {...imageData} />
//       ));
//     } else if (selectedTag !== "") {
//       return filteredImages.map((imageData: imageData) => (
//         <ImageItem key={imageData.path} {...imageData} />
//       ));
//     }
//   };

//   useEffect(() => {
//     console.log(filteredImages);
//   }, [filteredImages]);

//   function handleDragEnd(event:any) {
//     const {active, over} = event;

//     if (active.id !== over.id) {
//       setItems((items) => {
//         const oldIndex = items.indexOf(active.id);
//         const newIndex = items.indexOf(over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   }
// }

//   return (
//     <main className="imageGallery__main">
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <div className="container imageGallery__container">
//         <SortableContext
//         items={items}
//         strategy={verticalListSortingStrategy}
//       >
//           {renderImages()}
//           </SortableContext>
//         </div>
//       </DndContext>
//     </main>
//   )
// };

// export default ImageGallery;

// import { imagesData } from "../../../utils/data";
// import { imageData } from "../../../utils/interfaces";
// import "./imageGallery.css";
// import Skeleton from "react-loading-skeleton";
// import { useEffect, useState } from "react";
// import "react-loading-skeleton/dist/skeleton.css";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import {
//   SortableContext,
//   arrayMove,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// type ImageGalleryProps = {
//   selectedTag: string;
// };

// const ImageItem = ({ path, tag }: imageData) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: path });

//   const style = {
//     transition,
//     transform: CSS.Transform.toString(transform),
//   };
//   return (
//     <article
//       style={style}
//       ref={setNodeRef}
//       {...attributes}
//       {...listeners}
//       id={path}
//       className="image__item"
//     >
//       <div>
//         <img src={path} alt={`${tag} image`} />
//       </div>
//       <p>{tag}</p>
//     </article>
//   );
// };

// const ImageGallery = ({ selectedTag }: ImageGalleryProps) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [items, setItems] = useState<[]>([]);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   }, [selectedTag]);

//   const filteredImages = imagesData.filter(
//     (image) => image.tag === selectedTag
//   );

//   const renderImages = () => {
//     if (isLoading) {
//       return imagesData.map((imageData: imageData) => (
//         <Skeleton key={imageData.path} height={400} />
//       ));
//     } else if (selectedTag === "") {
//       return imagesData.map((imageData: imageData, index: number) => (
//         <ImageItem key={imageData.path} {...imageData} />
//       ));
//     } else if (selectedTag !== "") {
//       return filteredImages.map((imageData: imageData, index: number) => (
//         <ImageItem key={imageData.path} {...imageData} />
//       ));
//     }
//   };

//   const onDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (!active || !over || active.id === over.id) {
//       return;
//     }
//   };

//   useEffect(() => {
//     console.log(filteredImages);
//   }, [filteredImages]);

//   return (
//     <main className="imageGallery__main">
//       <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
//         <div className="container imageGallery__container">
//           <SortableContext
//             items={imagesData}
//             strategy={verticalListSortingStrategy}
//           >
//             {renderImages()}
//           </SortableContext>
//         </div>
//       </DndContext>
//     </main>
//   );
// };

// export default ImageGallery;

import { imagesData } from "../../../utils/data";
import { imageData } from "../../../utils/interfaces";
import "./imageGallery.css";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState, useMemo, Suspense } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ImageGalleryProps = {
  selectedTag: string;
};

const ImageItem = ({ path, tag }: imageData) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: path });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <article
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      id={path}
      className="image__item"
    >
      <div>
        <img src={path} alt={`${tag} image`} />
      </div>
      <p>{tag}</p>
    </article>
  );
};

const ImageGallery = ({ selectedTag }: ImageGalleryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<any>(imagesData); // Change the type to imageData[]

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedTag]);

  // const filteredImages = imagesData.filter(
  //   (image) => image.tag === selectedTag
  // );

  const filteredImages = useMemo(() => {
    if (selectedTag === "") {
      return items;
    } else {
      return items.filter((image: imageData) => image.tag === selectedTag);
    }
  }, [selectedTag, items]);

  const renderImages = () => {
    if (isLoading) {
      return imagesData.map((imageData: imageData) => (
        <Skeleton key={imageData.path} height={400} />
      ));
    } else if (selectedTag === "") {
      return items.map((imageData: imageData) => (
        <ImageItem key={imageData.path} {...imageData} />
      ));
    } else if (selectedTag !== "") {
      return filteredImages.map((imageData: imageData) => (
        <ImageItem key={imageData.path} {...imageData} />
      ));
    }
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) {
      return;
    }

    // Implement the logic to update the order of items
    const oldIndex = items.findIndex(
      (item: imageData) => item.path === active.id
    );
    const newIndex = items.findIndex(
      (item: imageData) => item.path === over.id
    );

    if (oldIndex !== -1 && newIndex !== -1) {
      setItems((items: imageData[]) => {
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    console.log(filteredImages);
  }, [filteredImages]);

  return (
    <main className="imageGallery__main">
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className="container imageGallery__container">
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <Suspense fallback={<Skeleton />}></Suspense>
            {renderImages()}
          </SortableContext>
        </div>
      </DndContext>
    </main>
  );
};

export default ImageGallery;

// BASE WORKING
// import { imagesData } from "../../../utils/data";
// import { imageData } from "../../../utils/interfaces";
// import "./imageGallery.css";
// import Skeleton from "react-loading-skeleton";
// import { useEffect, useRef, useState } from "react";
// import "react-loading-skeleton/dist/skeleton.css";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   }, [selectedTag]);

//   const filteredImages = imagesData.filter(
//     (image) => image.tag === selectedTag
//   );

//   const renderImages = () => {
//     if (isLoading) {
//       return imagesData.map((imageData: imageData) => (
//         <Skeleton key={imageData.path} height={400} />
//       ));
//     } else if (selectedTag === "") {
//       return imagesData.map((imageData: imageData) => (
//         <ImageItem key={imageData.path} {...imageData} />
//       ));
//     } else if (selectedTag !== "") {
//       return filteredImages.map((imageData: imageData) => (
//         <ImageItem key={imageData.path} {...imageData} />
//       ));
//     }
//   };

//   useEffect(() => {
//     console.log(filteredImages);
//   }, [filteredImages]);

//   return (
//     <main className="imageGallery__main">
//       <div className="container imageGallery__container">{renderImages()}</div>
//     </main>
//   );
// };

// export default ImageGallery;

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
