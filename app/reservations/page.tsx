"use client";
import { useEffect, useState } from "react";
import { Restaurant } from "../components/RestaurantCard";
import { Reservation } from "../api/reservations/route";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [restaurants, setRestaurants] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const resReservations = await fetch("/api/reservations");
      const reservationsData = await resReservations.json();

      const resRestaurants = await fetch("/api/restaurants");
      const restaurantsData = await resRestaurants.json();

      const mapping: Record<number, string> = {};
      restaurantsData.forEach((r: Restaurant) => {
        mapping[r.id] = r.name;
      });

      setReservations(reservationsData);
      setRestaurants(mapping);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading reservations...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Reservations</h1>

      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Restaurant</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">People</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td className="border p-2">
                  {restaurants[r.restaurantId] || r.restaurantId}
                </td>
                <td className="border p-2">{r.name}</td>
                <td className="border p-2">{r.date}</td>
                <td className="border p-2">{r.time}</td>
                <td className="border p-2">{r.people}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
