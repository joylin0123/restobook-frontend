"use client";
import { Restaurant } from "@/app/components/RestaurantCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    people: 2,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchRestaurant() {
      const res = await fetch(`/api/restaurants/${id}`);
      const data = await res.json();
      setRestaurant(data);
      setLoading(false);
    }
    if (id) fetchRestaurant();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: id,
          ...formData,
        }),
      });
      const result = await res.json();
      setMessage(result.message || "Reservation created ✅");
      setFormData({ name: "", date: "", time: "", people: 2 });
    } catch (err) {
      setMessage("Something went wrong ❌");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!restaurant) return <p className="p-6">Restaurant not found ❌</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
      <p className="text-gray-600 mb-4">{restaurant.city}</p>
      <p className="text-gray-500 mb-6">{restaurant.description}</p>
      <img
        src={restaurant.image_url}
        alt={restaurant.name}
        className="rounded mb-6"
      />

      <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded shadow"
      >
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          min="1"
          max="20"
          value={formData.people}
          onChange={(e) =>
            setFormData({ ...formData, people: Number(e.target.value) })
          }
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Reserve Table
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
