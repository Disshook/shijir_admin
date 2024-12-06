"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import storageService from "@/utils/storage/storageService";
import React, { useEffect, useState } from "react";

const SignInForm = () => {
  const router = useRouter();
  useEffect(() => {
    const token = storageService.get(window, "token");
    const user = JSON.parse(storageService.get(window, "user"));

    if ((token && user?.role == "admin") || user?.role == "operator") {
      router.push("/login");
    }
  });
  const [form, setForm] = useState({
    name: "",
    pass: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSignIn = () => {
    axios
      .post("https://shijirback.tanuweb.cloud/api/v1/user/login", {
        email: form.name,
        password: form.pass,
      })
      .then((res) => {
        alert("Амжилттай");
        storageService.set(window, "user", JSON.stringify(res.data.data));
        storageService.set(window, "token", res.data.token);
        router.push("/home");
      })
      .catch((er) => console.log(er));
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 font-bold text-2xl font-semibold text-gray-900 dark:text-white">
          Shijir.mn ADMIN
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Нэвтрэх
            </h1>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Нэвтрэх нэр
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleInputChange}
                name="name"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="admin г.м"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="pass"
                value={form.pass}
                onChange={handleInputChange}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              onClick={onSignIn}
              className="w-full text-white  bg-[#1D4ED8] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Нэвтрэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
