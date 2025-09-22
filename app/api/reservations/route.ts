import { NextResponse } from "next/server";



export interface Reservation {
  id: number;
  restaurantId: number;
  name: string;
  date: string;
  time: string;
  people: number;
}

const reservations: Reservation[] = [];

export async function POST(req: Request) {
  const data = await req.json();
  const newReservation = {
    id: reservations.length + 1,
    ...data,
  };

  reservations.push(newReservation);
  console.log("📌 Reservation saved:", newReservation);

  return NextResponse.json({
    message: "Reservation created successfully ✅",
    reservation: newReservation,
  });
}

export async function GET() {
  return NextResponse.json(reservations);
}
