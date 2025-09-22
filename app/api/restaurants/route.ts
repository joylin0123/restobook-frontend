import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "restaurants.json");
    const data = await fs.readFile(filePath, "utf-8");
    const restaurants = JSON.parse(data);

    return NextResponse.json(restaurants);
  } catch (err) {
    console.error("Error reading restaurants.json", err);
    return NextResponse.json({ error: "Failed to load restaurants" }, { status: 500 });
  }
}
