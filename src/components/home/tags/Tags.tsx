import { tags } from "../../../utils/data";
import "./tag.css";

type TagsProps = {
  selectedTag: string;
  handleTagClick: (value: string) => void;
};

type TagItemProps = {
  tagName: string;
  selectedTag: string;
  handleTagClick: (value: string) => void;
};

const TagItem = ({ tagName, selectedTag, handleTagClick }: TagItemProps) => {
  return (
    <button
      onClick={() => handleTagClick(tagName)}
      className={`tagBtn ${selectedTag === tagName && "activeTag"}`}
    >
      {tagName}
    </button>
  );
};

const Tags = ({ selectedTag, handleTagClick }: TagsProps) => {
  return (
    <div>
      {tags.map((tag) => (
        <TagItem
          key={tag.id}
          tagName={tag.tagName}
          selectedTag={selectedTag}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default Tags;
