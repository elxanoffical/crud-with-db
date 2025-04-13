"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function HomePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <section className="w-full h-full ">
      <div className="border border-black flex flex-col gap-5 items-center py-10">
        <h1 className="text-3xl text-gray-600 font-medium border-b">
          Home Shops
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center gap-10">
          <input
            type="text"
            placeholder="name"
            className="border px-3 py-1 rounded-xl"
          />
          <button
            type="submit"
            className="border border-black px-5 py-1 rounded-xl"
          >
            Add
          </button>
        </form>
      </div>
    </section>
  );
}
