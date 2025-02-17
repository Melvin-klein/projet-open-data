import {useContext} from "react";
import {DataContext} from "@/contexts/data-context";
import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import * as d3 from "d3";

export default function Classification() {
    const dataContext = useContext(DataContext)
    const [geojsonData, filteredData] = dataContext.trainKMeans(5)

    const getColor = d3.scaleSequential(d3.interpolateViridis)
        .domain([geojsonData.infestation_min, geojsonData.infestation_max]);

    const meanClusterData = filteredData
        .loc({ columns : ['taux_infestation', 'taux_eradication', 'taux_reinfestation', 'pop_pov_pct', 'pop_pov_u18_pct', 'pop_65p_pct', 'clusters'] })
        .groupby(["clusters"])
        .agg({ "taux_infestation": "mean", "taux_eradication": "mean", "taux_reinfestation": "mean", 'pop_pov_pct': "mean", 'pop_pov_u18_pct': "mean", 'pop_65p_pct': "mean" })
        .loc({ columns : ['clusters', 'taux_infestation_mean', 'taux_eradication_mean', 'taux_reinfestation_mean', 'pop_pov_pct_mean', 'pop_pov_u18_pct_mean', 'pop_65p_pct_mean'] })

    return <div>
        <div className="w-full overflow-hidden mt-4">
            <MapContainer center={dataContext.position} zoom={10} scrollWheelZoom={false} className="w-full h-full bg-red-500" style={{ height: "500px", width: "100%" }} >
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
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                        <tr>
                            {meanClusterData.columns.map((column, index) => {
                                return <th key={index} scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3 min-w-48">
                                    {column}
                                </th>
                            })}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {meanClusterData.values.map((row, indexRow) => {
                                return (
                                    <tr key={indexRow}>
                                        {row.map((item, indexCol) => <td key={`${indexRow}-${indexCol}`} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{indexCol === 0 ? item : item.toFixed(5)}</td>)}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}
