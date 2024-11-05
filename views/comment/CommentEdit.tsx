"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/(admin)/travels/ImageUploader";
import { useRouter, useParams } from "next/navigation";

const CommentEditView = () => {
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    username: "",
    comment: "",
    photo: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://taiga.tanuweb.cloud/api/v1/comment/${id}`)
        .then((res) => {
          const commentData = res.data.data;
          setSingle(commentData);
          setForm({
            username: commentData.username,
            comment: commentData.comment,
            photo: commentData.file,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching comment:", err);
          alert("Сэтгэгдлийг ачаалахад алдаа гарлаа.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [cover, setCover] = useState<File | null>(null);

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("comment", form.comment);
    if (cover) {
      formData.append("file", cover);
    }

    axios
      .put(`https://taiga.tanuweb.cloud/api/v1/comment/${id}`, formData)
      .then(() => {
        alert("Сэтгэгдэл амжилттай шинэчлэгдлээ!");
        router.push("/comment");
      })
      .catch((err) => {
        console.error("Error updating comment:", err);
        alert("Сэтгэгдлийг шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу.");
      });
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span>Сэтгэгдлийг ачааллаж байна...</span>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-sm lg:text-lg text-[#162C43]">
          Сэтгэгдэл засах
        </span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white text-xs lg:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Left Column (Image Section) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Сэтгэгдэл зураг</span>
            </div>
            <hr />
            <div className="w-full">
              {form.photo && !cover ? (
                <img
                  src={`https://taiga.tanuweb.cloud/uploads/${form.photo}`}
                  alt="Comment"
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <ImageUploader isSquare onFileChange={handleSingleFileChange} />
              )}
            </div>
            <div className="flex gap-2 items-center w-full px-4 pt-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43]">
                (Зураг 5MB - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Сэтгэгдэл</span>
            </div>
            <hr />
            <div className="w-full">
              <div className="flex flex-col lg:flex-row w-full p-4">
                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <label
                    htmlFor="name"
                    className="text-xs lg:text-sm text-[#162c43]"
                  >
                    Нэр
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="username"
                    value={form.username}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43] bg-white"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <label
                    htmlFor="comment"
                    className="text-xs lg:text-sm text-[#162c43]"
                  >
                    Сэтгэгдэл
                  </label>
                  <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={form.comment}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43] bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentEditView;
