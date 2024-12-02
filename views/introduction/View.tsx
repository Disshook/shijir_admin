import React from "react";
import { Edit, Plus } from "lucide-react";
import { IMGURL } from "@/hooks/axios";
import Link from "next/link";

interface JournalProps {
  name: string;
  profile: string;
  _id: string;
}

const JournalCard: React.FC<{ journal: JournalProps }> = ({ journal }) => {
  let { name, profile, _id } = journal;

  return (
    <div className="p-6">
      <div className="flex flex-col relative group h-[28vh] rounded-xl overflow-hidden cursor-pointer">
        <div className="w-full h-full ">
          <img
            src={IMGURL + profile}
            alt=""
            className="object-cover w-full h-full rounded"
          />
        </div>
        <div className="px-6 w-full h-[20%] absolute bottom-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white flex items-center justify-center text-center">
          <span className="text-center w-full">{name}</span>
        </div>
        <div className="absolute top-2 right-2 space-y-2 flex flex-col items-center ">
          <Link href={`/introduction/edit/` + _id}>
            <button className="px-3 py-1 rounded-full text-white bg-blue-500">
              <Edit />
            </button>
          </Link>

          <Link href={"/introduction/add/"}>
            <button className="px-3 py-1 rounded-full text-white bg-blue-500">
              <Plus />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
