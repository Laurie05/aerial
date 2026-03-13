"use client";

import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { studios } from "@/data/studios";

// Fix default Leaflet marker icons
const defaultIcon = L.divIcon({
  html: `<svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24c0-6.63-5.37-12-12-12z" fill="#d946ef"/>
    <circle cx="12" cy="12" r="5" fill="white"/>
  </svg>`,
  className: "",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

const typeLabels: Record<string, string> = {
  silks: "Silks",
  trapeze: "Trapeze",
  lyra: "Lyra",
  rope: "Rope",
  hammock: "Hammock",
};

export default function StudioMap() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  const filteredStudios = useMemo(() => {
    let result = studios;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q)
      );
    }

    if (typeFilter.length > 0) {
      result = result.filter((s) =>
        typeFilter.some((t) => s.types.includes(t as typeof s.types[number]))
      );
    }

    return result;
  }, [search, typeFilter]);

  const toggleType = (type: string) => {
    setTypeFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="relative w-full h-full">
      {/* Search and filter overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 border border-purple-100 rounded-lg p-3 backdrop-blur-sm shadow-sm max-w-xs">
        <input
          type="text"
          placeholder="Search studios..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-silk-500 mb-2"
        />
        <div className="flex flex-wrap gap-1">
          {Object.entries(typeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggleType(key)}
              className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                typeFilter.includes(key)
                  ? "bg-silk-600 text-white"
                  : "bg-purple-50 text-gray-500 hover:text-gray-700 border border-purple-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {filteredStudios.length} studio{filteredStudios.length !== 1 ? "s" : ""}
        </p>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full"
        style={{ background: "#fafafa" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {filteredStudios.map((studio) => (
          <Marker
            key={studio.id}
            position={[studio.lat, studio.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="text-gray-900 min-w-[180px]">
                <h3 className="font-bold text-sm">{studio.name}</h3>
                <p className="text-xs text-gray-600">
                  {studio.city}, {studio.country}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {studio.types.map((type) => (
                    <span
                      key={type}
                      className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                {studio.website && (
                  <a
                    href={studio.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-600 hover:underline mt-1 block"
                  >
                    Visit website
                  </a>
                )}
                <button className="mt-2 w-full text-xs bg-purple-100 text-purple-700 rounded py-1 hover:bg-purple-200 transition-colors">
                  Set as Home Studio
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
