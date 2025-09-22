"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import RestaurantCard from "./components/RestaurantCard";

export default function Home() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/restaurants");
      const data = await res.json();
      setRestaurants(data);
    }
    fetchData();
  }, []);

  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.city.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="relative bg-gray-100 text-gray-900 py-16 mb-8 border-b">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover & Book Restaurants 🍽️
          </h1>
          <p className="mb-6 text-gray-600">
            Find your next meal in Amsterdam, Rotterdam, Utrecht and more.
          </p>
          <input
            type="text"
            placeholder="Search by name, city, or cuisine..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filtered.slice(0, 30).map((r) => (
          <Link key={r.id} href={`/restaurant/${r.id}`}>
            <RestaurantCard restaurant={r}/>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No restaurants found matching `&quot;`{query}`&quot;`
        </p>
      )}
    </div>
  );
}
