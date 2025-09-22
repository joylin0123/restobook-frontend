import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { Restaurant } from "@/app/components/RestaurantCard";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), "public", "restaurants.json");
    const data = await fs.readFile(filePath, "utf-8");
    const restaurants = JSON.parse(data);

    const restaurant = restaurants.find((r: Restaurant) => r.id === Number(params.id));

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json(restaurant);
  } catch (err) {
    console.error("Error reading restaurants.json", err);
    return NextResponse.json({ error: "Failed to load restaurant" }, { status: 500 });
  }
}
