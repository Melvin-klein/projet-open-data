"use client"

import {useContext} from "react";
import {DataContext} from "@/contexts/data-context";
//import Plot from "react-plotly.js";

export default function Top10DistrictsInfeste() {
    const dataContext = useContext(DataContext)

    const grouped = dataContext.top10DistrictsInfeste()

    const xValues = grouped["CDTA2020"].values;
    const infestationValues = grouped["Infested Dwelling Unit Count_sum"].values;

    return <div>Test</div>

    /*return <Plot
        data={[
            {
                type: 'bar',
                x: xValues,
                y: infestationValues
            }
        ]}
        layout={{
            title: "Graphique Dynamique",
            width: 900,
            height: 500,
        }}
        config={{displayModeBar: false}}
    />*/
}
