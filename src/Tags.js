import React from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
export default function Tags ({tags,setTags}) {
	
  const addTag = (e) => {
    if (e.key === "Enter" && tags.length <  5) {
      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
    }
  };
  
  const deleteTag = (deletedItem) => {
    const filteredTags = tags.filter((e) => e !== deletedItem);
    setTags(filteredTags);
  };


	return (
    <div className="tag-container">
    {tags.map((tag, index) => {
      return (
        <div key={index} className="tag">
          {tag} <span onClick={() => deleteTag(tag)}><HighlightOffIcon fontSize="small"/></span>
        </div>
      );
    })}
    <input type="text" placeholder="Anahtar Kelimeler" onKeyUp={addTag}/>
  </div>
	);
};
