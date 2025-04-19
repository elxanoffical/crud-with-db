import { connectDB } from "../../../lib/db";
import { NextResponse } from "next/server";
import { Book } from "../../../lib/models/Book";
import { z } from "zod";

const bookSchema = z.object({
  name: z.string().min(3).max(10),
  price: z.number().min(1).max(300),
});

export async function GET(req) {
  try {
    await connectDB();

    const allBooks = await Book.find();
    return NextResponse.json({ data: allBooks }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { mes: "THIS IS POST METHOD (USERS)".err },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    // check body
    const parsedBody = bookSchema.safeParse(body);

    if (!parsedBody.success) {
      const errors = parsedBody.error.errors.map((err) => ({
        message: err.message,
        path: err.path.join[0],
      }));
      return NextResponse.json(
        { mes: "Form validation error", errors },
        { status: 400 }
      );
    }
 
    const newBook = new Book({
      name: body.name,
      price: body.price,
    });

    await newBook.save();

    return NextResponse.json(
      { mes: "THIS IS POST METHOD (USERS)" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { mes: "THIS IS POST METHOD (USERS)".err },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();
    const DeleteBookById = await Book.findByIdAndDelete(body.id);

    return NextResponse.json({ data: "deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { mes: "THIS IS POST METHOD (USERS)".err },
      { status: 500 }
    );
  }
}
