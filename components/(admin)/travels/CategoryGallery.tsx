"use client";
import { useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { Image } from "lucide-react";

interface CategoryGalleryProps {
  handleAddCategory: () => void;
  category: Category[];
  onClick: (id: string) => void;
}
export default function CategoryGallery({
  handleAddCategory,
  onClick,
  category,
}: CategoryGalleryProps): JSX.Element {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div
      className="flex w-full overflow-x-scroll scrollbar-hide gap-2"
      {...events}
      ref={ref}
    >
      <div className="border-dashed w-32 aspect-square border-[#E5E5E5] border rounded-lg flex items-center justify-center">
        <div
          className="flex flex-col items-center w-full "
          onClick={handleAddCategory}
        >
          <Image color="#E5E5E5" size={30} />
          <span className="text-[#e5e5e5] text-[7pt] px-4 text-center w-full">
            Категори нэмэх
          </span>
        </div>
      </div>
      {category.map((list, index) => {
        return (
          <div
            className={`flex flex-col items-center justify-center w-32 transition-all duration-300 aspect-square bg-white border rounded-lg ${
              activeIdx == index ? "border-[#3749E5]" : ""
            }`}
            key={index}
            onClick={() => {
              setActiveIdx(index);
              onClick(list?._id!);
            }}
          >
            <img
              src={"https://taiga.tanuweb.cloud/uploads/" + list.photo}
              alt=""
              className="w-16 h-16 object-cover"
            />
            <span className="text-[#162C43] text-xs">{list.name}</span>
          </div>
        );
      })}
    </div>
  );
}
