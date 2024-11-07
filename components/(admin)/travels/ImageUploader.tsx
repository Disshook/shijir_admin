"use client";
import React, { useState } from "react";
import { Image, Trash } from "lucide-react";

interface ImageUploaderProps {
  onFileChange: (file: File | null) => void;
  isSquare?: boolean;
}

const ImageUploader = ({ onFileChange, isSquare }: ImageUploaderProps) => {
  const [img, setImg] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setImg(file); // Set the image state with the selected file
      onFileChange(file); // Trigger the file change callback
    }
  };
  const onRemove = () => {
    setImg(null);
    onFileChange(null);
  };

  return (
    <div className="w-full">
      <label htmlFor="file" className="w-full">
        {img ? (
          <div className="w-full  flex items-center justify-center p-4 ">
            <div className="relative">
              <div
                className="absolute top-0 right-0 w-8 h-8 rounded-bl-lg rounded-tr-lg bg-red-400 flex items-center justify-center"
                onClick={onRemove}
              >
                <Trash color="white" />
              </div>
              <img
                src={URL.createObjectURL(img)}
                alt="Uploaded"
                className={`object-cover w-full h-full rounded-lg  border ${
                  isSquare ? "aspect-square" : "aspect-video"
                } `}
              />
            </div>
          </div>
        ) : (
          <div
            className={`w-full ${
              isSquare ? "aspect-square" : "aspect-video"
            }  flex flex-col items-center  justify-center border-dashed border-[#E5E5E5] border rounded-lg`}
          >
            <Image color="#e5e5e5" size={30} />
            <span className="text-[#e5e5e5] text-[7pt] px-4 text-center w-full">
              Та зургаа чирж оруулах эсвэл дээр даран оруулна уу
            </span>
          </div>
        )}
      </label>
      <input
        type="file"
        id="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
