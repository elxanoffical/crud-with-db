"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function HomePage() {
  const { register, handleSubmit, reset } = useForm();
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      // API-yə POST sorğusu göndərilir.
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage("Kitab əlavə olundu!");
        // Serverdən gələn cavabı əldə edirik
        const result = await res.json();
        // Əldə olunan kitabı state-ə əlavə edirik.
        const newBook = result.data || data;
        setBooks((prev) => [...prev, newBook]);

        reset();
      } else {
        setMessage("Əlavə olunarkən xəta baş verdi.");
      }
    } catch (error) {
      setMessage("Xəta: " + error.message);
    }
  };

  // Kitabı silmək üçün funksiya
  const onDelete = async (id) => {
    console.log("Deleting book with ID:", id);  // ID-nin düzgün olduğunu yoxlayın

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Kitab silindi!");
        // Silinən kitabı siyahıdan çıxarırıq
        setBooks((prev) => prev.filter((book) => book._id !== id));
      } else {
        setMessage("Kitab silinərkən xəta baş verdi.");
      }
    } catch (error) {
      setMessage("Xəta: " + error.message);
    }
  };

  // Səhifə yüklənərkən mövcud kitabları alırıq.
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/books");
        console.log(res)
        if (res.ok) {
          const result = await res.json();
          console.log(result.data)
          setBooks(result.data);
        }
      } catch (error) {
        console.error("Kitablar alınarkən xəta:", error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kitab Əlavə Et</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Kitab Adı"
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Qiymət"
          className="border p-2 w-full rounded"
        />
        {/* <input
          {...register("description", { required: true })}
          placeholder="Təsvir"
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          {...register("pageCount", { required: true })}
          placeholder="Səhifə Sayı"
          className="border p-2 w-full rounded"
        />
        <input
          {...register("category", { required: true })}
          placeholder="Kateqoriya"
          className="border p-2 w-full rounded"
        />
        <input
          {...register("publishDate", { required: true })}
          placeholder="Nəşr Tarixi"
          className="border p-2 w-full rounded"
        />
        <input
          {...register("author", { required: true })}
          placeholder="Müəllif"
          className="border p-2 w-full rounded"
        />
        <input
          {...register("language", { required: true })}
          placeholder="Dil"
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          {...register("stockCount", { required: true })}
          placeholder="Stok Sayı"
          className="border p-2 w-full rounded"
        /> */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded"
        >
          Əlavə Et
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Əlavə Olunan Kitablar</h2>
        {books.length > 0 ? (
          <ul className="space-y-4">
            {books.map((book, index) => {
              const bookId = book._id || book.id;  // _id varsa, onu id olaraq istifadə et
              console.log("Book ID:", bookId); 
              return (
                <li key={bookId} className="border p-4 rounded relative">
                  <button
                    onClick={() => {
                      onDelete(bookId);
                    }}
                    className="absolute top-2 right-2 text-red-500 cursor-pointer"
                  >
                    X
                  </button>
                  <p className="font-bold">Kitab Adı: {book.name}</p>
                  <p>Qiymət: {book.price} AZN</p>
                  {/* <p>Təsvir: {book.description}</p>
                  <p>Səhifə Sayı: {book.pageCount}</p>
                  <p>Kateqoriya: {book.category}</p>
                  <p>Nəşr Tarixi: {book.publishDate}</p>
                  <p>Müəllif: {book.author}</p>
                  <p>Dil: {book.language}</p>
                  <p>Stok Sayı: {book.stockCount}</p> */}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Hal-hazırda kitab yoxdur.</p>
        )}
      </div>
    </div>
  );
}
