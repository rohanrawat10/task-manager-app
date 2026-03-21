import React, { useState } from "react";
import { MdAddComment, MdDelete, MdOutlineAttachment } from "react-icons/md";

function AddAttachmentsInput({ attachments, setAttachments }) {

  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim() !== "") {
      const newAttachment = {
        id: Date.now(),
        url: option.trim(),
      };

      setAttachments([...attachments, newAttachment]);
      setOption("");
    }
  };

  const handleDeleteOption = (id) => {
    const updatedArray = attachments.filter((item) => item.id !== id);
    setAttachments(updatedArray);
  };

  return (
    <div>

      {attachments.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100">
            <MdOutlineAttachment className="text-gray-400" />
            <p className="text-sm text-black">{item.url}</p>
          </div>

          <button
            type="button"
            className="cursor-pointer p-1 hover:bg-red-300 rounded-full transition-colors"
            onClick={() => handleDeleteOption(item.id)}
            aria-label={`Delete item ${index + 1}`}
          >
            <MdDelete className="text-lg" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">

        <div className="flex-1 flex items-center gap-3 border border-gray-100 px-3 py-2 rounded-md">
          <MdOutlineAttachment className="text-gray-400" />

          <input
            type="text"
            placeholder="Add file link"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddOption();
            }}
            className="w-full text-[13px] text-black outline-none bg-white border border-gray-300 px-3 py-3 rounded-xl"
          />
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          onClick={handleAddOption}
        >
          <MdAddComment className="text-lg" />
          Add
        </button>

      </div>

    </div>
  );
}

export default AddAttachmentsInput;