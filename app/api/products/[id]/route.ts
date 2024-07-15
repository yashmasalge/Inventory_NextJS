import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params} :{params: { id: string }  }) {
  const { id } = params ;
  const { newName: name, newCategory: category, newBrand : brand,  newDescription: description, newPrine : price } = await request.json();
  await connectMongoDB();
  await Product.findByIdAndUpdate(id, { name, category, brand, description, price });
  return NextResponse.json({ message: "Products updated" }, { status: 200 });
}

export async function GET(request: NextRequest, { params} :{params: { id: string }}) {
  const { id } = params;
  await connectMongoDB();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}