import { NextResponse } from "next/server";

const users = [
  {
    id: 1,
    fullName: "Elxan meherremli",
    salary: 3000,
    level: 3,
  },
  {
    id: 2,
    fullName: "Orxan eliyev",
    salary: 4000,
    level: 6,
  },
];

export async function GET(req, { params }) {
  const { id } = await params;
  const user = users.find(user => user.id == id);
  if (!user) {
    return NextResponse.json({ mes: "USER NOT FOUND" }, { status: 404 });
  }
  return NextResponse.json(
    { mes: "THIS IS GET BY ID METHOD (USERS)", data: user },
    { status: 200 }
  );
}
