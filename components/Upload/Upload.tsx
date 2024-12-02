import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Upload = ({
  onFileChange,
  file,
  title,
}: {
  onFileChange: (files: File[]) => void;
  file?: File | File[];
  title: string;
}) => {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
      onFileChange([...files, ...fileArray]); // Pass updated files to parent component
    }
  };

  useEffect(() => {
    if (file) {
      const filesArray = Array.isArray(file) ? file : [file];
      setFiles(filesArray);
      const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
      setFilePreviews(previewUrls);

      return () => {
        previewUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [file]);

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileChange(updatedFiles); // Update parent component with new files list

    const updatedPreviews = updatedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setFilePreviews(updatedPreviews);

    // Revoke old URLs
    filePreviews.forEach((url) => URL.revokeObjectURL(url));
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {filePreviews.map((preview, index) => (
        <div key={index} className="relative w-full h-[10vh]">
          <div
            className="absolute top-0 right-0 bg-white p-1 cursor-pointer"
            onClick={() => handleRemoveFile(index)}
          >
            <X color="red" />
          </div>
          <img
            src={preview}
            alt={`Selected file ${index + 1}`}
            className="w-full h-[10vh] object-cover rounded"
          />
        </div>
      ))}
      <label
        htmlFor={`file-upload${title}`}
        className="w-full h-[10vh] rounded bg-gray-400 flex items-center justify-center cursor-pointer"
      >
        <Plus color="white" size={30} />
      </label>
      <input
        type="file"
        multiple
        className="hidden"
        id={`file-upload${title}`}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Upload;
