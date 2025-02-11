'use client'

import {useEffect, useState} from "react";
import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function MapComponent() {
    const [geojsonData, setGeojsonData] = useState(null);
    const position = [40.7142700, -74.0059700]

    useEffect(() => {
        const fetchGeoJSON = async () => {
            try {
                const response = await fetch("/nyc.json");
                const data = await response.json();
                setGeojsonData(data);
            } catch (error) {
                console.error("Erreur lors du chargement du GeoJSON :", error);
            }
        };

        fetchGeoJSON();
    }, []);

    return <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 overflow-hidden">
        <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="w-full h-full" style={{ height: "500px", width: "100%" }} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geojsonData && (
                <GeoJSON
                    data={geojsonData}
                    style={() => ({
                        color: "#ff7800",
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                    })}
                    onEachFeature={(feature, layer) => {
                        layer.bindPopup(`<strong>Quartier :</strong> ${feature.properties.BoroName}`);
                    }}
                />
            )}
        </MapContainer>
    </div>
}
