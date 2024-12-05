import React, { useState } from "react";

interface FileUploadType {
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload = ({ onchange }: FileUploadType) => {
  const [video, setVideo] = useState<File | null>(null);
  const [show, setShow] = useState<boolean>(true);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null; // Check if files exist
    if (file) {
      setVideo(file);
      onchange(e); // Pass the entire event to onchange
      setShow(false);
    }
  };

  return (
    <div className="video-upload overflow-hidden">
      <label htmlFor="video-upload-input" className="font-bold">
        {"Видео оруулна уу"}
      </label>
      <input
        type="file"
        id="video-upload-input"
        accept="video/*"
        onChange={handleVideoChange}
        className="my-4 hidden"
      />
      {show && (
        <label htmlFor="video-upload-input">
          <div className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-gray-300 py-4">
            <span className="text-center font-bold text-black">
              Видео оруулна уу
            </span>
          </div>
        </label>
      )}
      {video && (
        <video src={URL.createObjectURL(video)} controls className="p-10" />
      )}
    </div>
  );
};

export default FileUpload;
