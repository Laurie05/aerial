"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { studios as curatedStudios } from "@/data/studios";
import communityStudiosData from "@/data/aerial-arts-map-studios.json";

const MARKER_ZOOM_THRESHOLD = 3;

const purplePinSvg = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#7c3aed"/><circle cx="12" cy="12" r="5" fill="white"/></svg>`
);

const purpleIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,${purplePinSvg}`,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

interface MapStudio {
  id: string;
  name: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
  website?: string;
  ceilingHeight?: string;
  types?: string[];
  curated?: boolean;
}

const typeLabels: Record<string, string> = {
  silks: "Silks",
  trapeze: "Trapeze",
  lyra: "Lyra",
  rope: "Rope",
  hammock: "Hammock",
  straps: "Straps",
  pole: "Pole",
  handstand: "Handstand",
  acrobatics: "Acrobatics",
  "spanish-web": "Spanish Web",
  "flying-trapeze": "Flying Trapeze",
};

function getGoogleMapsEmbedUrl(name: string, city: string) {
  const query = encodeURIComponent(`${name} ${city}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

function getGoogleMapsUrl(name: string, city: string) {
  const query = encodeURIComponent(`${name} ${city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// Merge curated + community studios, deduplicating by proximity
function buildAllStudios(): MapStudio[] {
  const all: MapStudio[] = curatedStudios.map((s) => ({
    ...s,
    curated: true,
  }));

  const curatedCoords = new Set(
    curatedStudios.map((s) => `${s.lat.toFixed(2)},${s.lng.toFixed(2)}`)
  );

  for (const s of communityStudiosData as MapStudio[]) {
    const key = `${s.lat.toFixed(2)},${s.lng.toFixed(2)}`;
    if (!curatedCoords.has(key)) {
      all.push({ ...s, curated: false });
    }
  }

  return all;
}

const allStudios = buildAllStudios();

function HeatmapLayer({ points }: { points: [number, number, number][] }) {
  const map = useMap();

  useEffect(() => {
    const heat = (L as unknown as { heatLayer: (pts: [number, number, number][], opts: Record<string, unknown>) => L.Layer }).heatLayer(points, {
      radius: 20,
      blur: 10,
      maxZoom: 12,
      minOpacity: 0.2,
      max: 0.3,
      gradient: {
        0.0: "#c4b5fd",
        0.3: "#a78bfa",
        0.5: "#8b5cf6",
        0.7: "#7c3aed",
        1.0: "#5b21b6",
      },
    }) as L.Layer;

    heat.addTo(map);
    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}

function MapContent({
  studios,
  heatPoints,
  onSelect,
}: {
  studios: MapStudio[];
  heatPoints: [number, number, number][];
  onSelect: (s: MapStudio) => void;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  });

  const showMarkers = zoom >= MARKER_ZOOM_THRESHOLD;

  // Only render markers visible in current bounds
  const bounds = map.getBounds();
  const visibleStudios = useMemo(
    () =>
      showMarkers
        ? studios.filter((s) => bounds.contains([s.lat, s.lng]))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showMarkers, studios, zoom, bounds.toBBoxString()]
  );

  return (
    <>
      {!showMarkers && <HeatmapLayer points={heatPoints} />}
      {showMarkers &&
        visibleStudios.map((studio) => (
          <Marker
            key={studio.id}
            position={[studio.lat, studio.lng]}
            icon={purpleIcon}
            eventHandlers={{ click: () => onSelect(studio) }}
          >
            <Popup>
              <div className="min-w-[160px]">
                <strong className="text-sm">{studio.name}</strong>
                {(studio.city || studio.country) && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {[studio.city, studio.country].filter(Boolean).join(", ")}
                  </p>
                )}
                {studio.ceilingHeight && (
                  <p className="text-xs text-gray-400">
                    Height: {studio.ceilingHeight}
                  </p>
                )}
                {studio.types && studio.types.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {studio.types.slice(0, 3).map((type) => (
                      <span
                        key={type}
                        className="px-1 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px]"
                      >
                        {typeLabels[type] || type}
                      </span>
                    ))}
                    {studio.types.length > 3 && (
                      <span className="text-[10px] text-gray-400">
                        +{studio.types.length - 3}
                      </span>
                    )}
                  </div>
                )}
                <button
                  onClick={() => onSelect(studio)}
                  className="text-xs text-purple-600 hover:underline mt-1.5 block"
                >
                  View details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
}

export default function StudioMap() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<MapStudio | null>(null);
  const [showCuratedOnly, setShowCuratedOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredStudios = useMemo(() => {
    let result = showCuratedOnly
      ? allStudios.filter((s) => s.curated)
      : allStudios;

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
      result = result.filter(
        (s) => s.types && typeFilter.some((t) => s.types!.includes(t))
      );
    }

    return result;
  }, [search, typeFilter, showCuratedOnly]);

  const heatPoints = useMemo(
    () =>
      filteredStudios.map(
        (s) => [s.lat, s.lng, 1.0] as [number, number, number]
      ),
    [filteredStudios]
  );

  const toggleType = (type: string) => {
    setTypeFilter((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="flex h-full relative">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen((v) => !v)}
        className="sm:hidden absolute top-2 left-2 z-[1000] bg-white border border-purple-200 rounded-lg p-2 shadow-md"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/30 z-[999]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`absolute sm:relative z-[1000] sm:z-auto h-full w-72 sm:w-[20%] shrink-0 border-r border-purple-100 bg-white overflow-y-auto transition-transform duration-200 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      }`}>
        <div className="p-3 border-b border-purple-100">
          <input
            type="text"
            placeholder="Search studios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-silk-500 mb-2"
          />
          <div className="flex flex-wrap gap-1">
            {["silks", "lyra", "hammock", "rope", "trapeze", "straps"].map(
              (key) => (
                <button
                  key={key}
                  onClick={() => toggleType(key)}
                  className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                    typeFilter.includes(key)
                      ? "bg-purple-600 text-white"
                      : "bg-purple-50 text-gray-500 hover:text-gray-700 border border-purple-200"
                  }`}
                >
                  {typeLabels[key]}
                </button>
              )
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-400">
              {filteredStudios.length} studios on map
            </p>
            <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={showCuratedOnly}
                onChange={(e) => setShowCuratedOnly(e.target.checked)}
                className="rounded border-purple-300 text-silk-600 focus:ring-silk-500"
              />
              Curated only
            </label>
          </div>
        </div>

        <div className="divide-y divide-purple-50">
          {filteredStudios.map((studio) => (
            <button
              key={studio.id}
              onClick={() => { setSelectedStudio(studio); setSidebarOpen(false); }}
              className={`w-full text-left px-3 py-3 hover:bg-purple-50 transition-colors ${
                selectedStudio?.id === studio.id ? "bg-purple-50" : ""
              }`}
            >
              <h3 className="font-semibold text-sm text-gray-900">
                {studio.name}
              </h3>
              <p className="text-xs text-gray-500">
                {[studio.city, studio.country].filter(Boolean).join(", ")}
              </p>
              {studio.ceilingHeight && (
                <p className="text-xs text-gray-400">
                  Height: {studio.ceilingHeight}
                </p>
              )}
              {studio.types && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {studio.types.slice(0, 4).map((type) => (
                    <span
                      key={type}
                      className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs"
                    >
                      {typeLabels[type] || type}
                    </span>
                  ))}
                  {studio.types.length > 4 && (
                    <span className="px-1.5 py-0.5 text-gray-400 text-xs">
                      +{studio.types.length - 4}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Map / Detail area */}
      <div className="flex-1 relative">
        {selectedStudio ? (
          <div className="w-full h-full flex flex-col">
            {/* Studio info bar */}
            <div className="bg-white border-b border-purple-100 px-4 py-3 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-lg text-gray-900">
                    {selectedStudio.name}
                  </h2>
                  {selectedStudio.curated && (
                    <span className="px-1.5 py-0.5 bg-silk-100 text-silk-700 rounded text-[10px] font-medium">
                      Curated
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {[selectedStudio.city, selectedStudio.country]
                    .filter(Boolean)
                    .join(", ")}
                  {selectedStudio.ceilingHeight &&
                    ` · Height: ${selectedStudio.ceilingHeight}`}
                </p>
                {selectedStudio.types && selectedStudio.types.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {selectedStudio.types.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs"
                      >
                        {typeLabels[type] || type}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 mt-2">
                  <a
                    href={getGoogleMapsUrl(
                      selectedStudio.name,
                      selectedStudio.city
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-600 hover:underline inline-flex items-center gap-1"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Open in Google Maps
                  </a>
                  {selectedStudio.website && (
                    <a
                      href={selectedStudio.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-600 hover:underline"
                    >
                      Visit website
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedStudio(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
                title="Back to map"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Google Maps embed */}
            <div className="flex-1">
              <iframe
                src={getGoogleMapsEmbedUrl(
                  selectedStudio.name,
                  selectedStudio.city
                )}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${selectedStudio.name}`}
              />
            </div>
          </div>
        ) : (
          <MapContainer
            center={[30, 0]}
            zoom={2}
            className="w-full h-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapContent
              studios={filteredStudios}
              heatPoints={heatPoints}
              onSelect={setSelectedStudio}
            />
          </MapContainer>
        )}
      </div>
    </div>
  );
}
