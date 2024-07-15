import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
  const { name, category , brand,description, price } = await request.json();
  await connectMongoDB();
  await Product.create({  name, category , brand,description, price });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Product.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request : NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}