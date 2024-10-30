"use client";
import { useState, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Image, Trash } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface TravelGalleryProps {
  onChange: (file: File[]) => void;
}

export default function TravelGallery({
  onChange,
}: TravelGalleryProps): JSX.Element {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files); // Convert FileList to Array
      setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);
      onChange([...selectedFiles, ...fileArray]);
    }
  };

  const handleRemove = (idx: number) => {
    setSelectedFiles(
      selectedFiles.filter((el, index: number) => index !== idx)
    );
    onChange(selectedFiles.filter((el, index: number) => index !== idx));
  };

  return (
    <div
      className="flex w-full overflow-x-scroll scrollbar-hide gap-2"
      {...events}
      ref={ref}
    >
      <label htmlFor="file-upload">
        <div className="border-dashed w-32 aspect-square border-[#E5E5E5] border rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center w-full">
            <Image color="#E5E5E5" size={30} />

            <p className="text-[#e5e5e5] text-[7pt] px-4 text-center ">
              Та зургаа чирж оруулах эсвэл дээр даран оруулна уу
            </p>
          </div>
        </div>
      </label>
      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Render the selected images */}
      <PhotoProvider>
        {selectedFiles.map((file, index: number) => (
          <div className="relative cursor-zoom-in">
            <div
              className="w-8 h-8 rounded-bl-lg rounded-tr-lg absolute bg-red-400 top-0 right-0 flex items-center justify-center cursor-pointer"
              onClick={() => {
                handleRemove(index);
              }}
            >
              <Trash color="white" size={20} />
            </div>
            <PhotoView src={URL.createObjectURL(file)}>
              <img
                key={index}
                className=" w-32 aspect-square border rounded-lg select-none object-cover"
                src={URL.createObjectURL(file)}
                alt={`uploaded-preview-${index}`}
              />
            </PhotoView>
          </div>
        ))}
      </PhotoProvider>
    </div>
  );
}
