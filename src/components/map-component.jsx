'use client'

import {useContext} from "react";
import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {DataContext} from "@/contexts/data-context";

const COLORS = {
    'Brooklyn': '#7ccf00',
    'Queens': '#fb2c36',
    'Staten Island': '#2b7fff',
    'Bronx': '#8e51ff',
    'Manhattan': '#efb100'
}

export default function MapComponent() {
    const dataContext = useContext(DataContext)

    const position = dataContext.position
    const geojsonData = dataContext.geojsonDataFiltered

    return <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 overflow-hidden">
        <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="w-full h-full" style={{ height: "500px", width: "100%" }} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geojsonData && (
                <GeoJSON
                    key={geojsonData.features.length}
                    data={geojsonData}
                    style={(item) => ({
                        color: COLORS[item.properties.BoroName],
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.4,
                    })}
                    onEachFeature={(feature, layer) => {
                        layer.bindPopup(`<strong>Quartier :</strong> ${feature.properties.BoroName} - ${feature.properties.CDTAName}`);
                    }}
                />
            )}
        </MapContainer>
    </div>
}
