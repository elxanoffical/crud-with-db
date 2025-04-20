import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { Book } from "../../../../lib/models/User";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const findBookById = await Book.findById(id);

    return NextResponse.json({ data: findBookById }, { status: 200 });
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
