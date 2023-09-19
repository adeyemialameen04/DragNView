import { useState } from "react";
import ImageGallery from "./imageGallery/ImageGallery";
import Tags from "./tags/Tags";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { toast } from "react-hot-toast";

const Home = () => {
  const [selectedTag, setSelectedTag] = useState("");

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const signOutOf = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully signed out!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={signOutOf}>Signout</button>
      <Tags selectedTag={selectedTag} handleTagClick={handleTagClick} />
      <ImageGallery selectedTag={selectedTag} />
    </div>
  );
};

export default Home;
