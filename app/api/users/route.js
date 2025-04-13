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
  {
    id: 2,
    fullName: "Yasem memmedli",
    salary: 1000,
    level: 8,
  },
];

export async function GET(req) {
  return NextResponse.json(
    { mes: "THIS IS GET METHOD (USERS)", data: users },
    { status: 200 }
  );
}

export async function POST(req) {
  const body = await req.json();
  const { id } = body;
  const user = users.find((user) => user.id == id);
  if (!user) {
    return NextResponse.json({ mes: "USER NOT FOUND" }, { status: 404 });
  }

  return NextResponse.json(
    { mes: "THIS IS POST METHOD (USERS)", data: user },
    { status: 200 }
  );
}

export async function DELETE(req) {
  const body = req.json;
  const { id } = body;

  const newUser = users.filter((user) => user.id != id);

  if (!newUser) {
    NextResponse.json({ mes: " USER NOT FOUND" }, { status: 404 });
  }

  return NextResponse.json(
    { mes: "User deleted by id", data: newUser },
    { status: 200 }
  );
}
