export interface Restaurant {
    id: number;
    name: string;
    location?: string;
    city?: string;
    cuisine?: string;
    image_url: string;
    average_rating?: number;
    description?: number;
}
  
export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
    return (
      <div className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition transform hover:-translate-y-1">
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <p className="text-gray-500 text-sm">
            {restaurant.city} · {restaurant.cuisine}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-yellow-600">
              ⭐ {restaurant.average_rating}
            </span>
            <span className="text-blue-600 text-sm">View →</span>
          </div>
        </div>
      </div>
    );
  }
  