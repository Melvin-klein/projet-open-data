'use client'

import * as d3 from "d3";
import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import {useContext} from "react";
import {DataContext} from "@/contexts/data-context";
import 'leaflet/dist/leaflet.css';

export default function CarteLoyerMoyenDistrict() {
    const dataContext = useContext(DataContext)

    const position = dataContext.position
    const geojsonData = dataContext.carteLoyerMoyenDistrict()

    const getColor = d3.scaleSequential(d3.interpolateViridis)
        .domain([geojsonData.infestation_min, geojsonData.infestation_max]);

    return <div className="w-full overflow-hidden bg-green-500 mt-4">
        <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="w-full h-full bg-red-500" style={{ height: "500px", width: "100%" }} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geojsonData && (
                <GeoJSON
                    key={geojsonData.features.length}
                    data={geojsonData}
                    style={(item) => ({
                        fillColor: getColor(item.properties.avg_infestation),
                        color: getColor(item.properties.avg_infestation),
                        weight: 2,
                        opacity: 0.7,
                        fillOpacity: 0.7,
                    })}
                    onEachFeature={(feature, layer) => {
                        layer.bindPopup(`<strong>Quartier :</strong> ${feature.properties.BoroName} - ${feature.properties.CDTAName} - ${feature.properties.avg_infestation}`);
                    }}
                />
            )}
        </MapContainer>
    </div>
}
