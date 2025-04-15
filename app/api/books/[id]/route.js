import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { Book } from "../../../../lib/models/Book";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const findBookById = await Book.findById(id);

    const bookWithId = findBookById.toObject();
    bookWithId.id = bookWithId._id;
    delete bookWithId._id;

    return NextResponse.json({ data: bookWithId }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { mes: "THIS IS POST METHOD (BOOKS)".err },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    console.log("Server received ID:", id);  

    if (!id) {
      return NextResponse.json(
        { message: "ID mövcud deyil." },
        { status: 400 }
      );
    }

    const DeleteBookById = await Book.findByIdAndDelete(id);

    return NextResponse.json({ data: DeleteBookById }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { mes: "THIS IS DELETE METHOD (BOOKS)".err },
      { status: 500 }
    );
  }
}
