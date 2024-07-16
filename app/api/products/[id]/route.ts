import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, category, brand, description, price } = await request.json();
  
  if (!name || !category || !price) {
    return NextResponse.json({ error: "Name, category, and price are required fields" }, { status: 400 });
  }

  await connectMongoDB();
  await Product.findByIdAndUpdate(id, { name, category, brand, description, price });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

export async function GET(request: NextRequest, { params} :{params: { id: string }}) {
  const { id } = params;
  await connectMongoDB();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}