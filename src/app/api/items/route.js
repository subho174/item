import connectDB from "@/src/db/connectDB";
import Item from "@/src/model/item.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const itemDetails = await req.json();

  const isBlankField = Object.entries(itemDetails).some(([key, value]) => {
    if (key === "additionalImages") return false;
    return !value;
  });

  if (isBlankField)
    return NextResponse.json("All fields are required", { status: 400 });

  try {
    await connectDB();

    const item = await Item.create(itemDetails);
    if (!item)
      return NextResponse.json(
        { message: "Failed to add item" },
        { status: 400 }
      );

    return NextResponse.json(
      { message: "Item added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
