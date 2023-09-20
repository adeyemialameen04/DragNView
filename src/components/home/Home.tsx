import { useState } from "react";
import ImageGallery from "./imageGallery/ImageGallery";
import Tags from "./tags/Tags";
import Navbar from "../navbar/Navbar";
import "./home.css";

const Home = () => {
  const [selectedTag, setSelectedTag] = useState("");

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <main className="home">
      <Navbar />
      <Tags selectedTag={selectedTag} handleTagClick={handleTagClick} />
      <ImageGallery selectedTag={selectedTag} />
    </main>
  );
};

export default Home;
