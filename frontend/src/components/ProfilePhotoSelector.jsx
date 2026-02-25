import React, { useRef, useState, useEffect } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { FaCamera } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function ProfilePhotoSelector({ image, setImage }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const handleRemove = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Image must be less than 2MB");
    return;
  }

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  const preview = URL.createObjectURL(file);
  setImage(file);
  setPreviewUrl(preview);
};

  // Cleanup memory
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 group">
        <div
          className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center 
          overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-blue-400"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="profile pic"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaCamera className="text-xl text-gray-400"  onClick={onChooseFile} />
          )}

          {/* Dark Overlay on Hover */}
          {/* <div
            className="absolute inset-0 bg-opacity-30 rounded-full 
            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          ></div> */}

          {!image ? (
            <button
              type="button"
              className="absolute -bottom-1 -right-1 
              bg-blue-500 text-white p-1 rounded-full 
                transition-color duration-200
              hover:bg-blue-600"
              onClick={onChooseFile}
            >
              <BiSolidImageAdd className="text-sm" />
            </button>
          ) : (
            <button
              type="button"
              className="absolute -bottom-2 -right-2 
              bg-red-500 text-white p-2 rounded-full 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-200
              hover:bg-red-600"
              onClick={handleRemove}
            >
              <MdDelete className="text-sm" />
            </button>
          )}
        </div>

        <input
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}