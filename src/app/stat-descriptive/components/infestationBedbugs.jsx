import Plot from "react-plotly.js";
import {useContext} from "react";
import {DataContext} from "@/contexts/data-context";

export default function InfestationBedbugs() {
    const dataContext = useContext(DataContext)

    const grouped = dataContext.getInfestationBedbug()

    const xValues = grouped["annee_fin_observation"].values;
    const infestationValues = grouped["Infested Dwelling Unit Count_sum"].values;

    return <Plot
        data={[
            {
                x: xValues,
                y: infestationValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
                name: 'Infestation'
            },
        ]}
        layout={{
            title: "Graphique Dynamique",
            width: 900,
            height: 500,
        }}
        config={{displayModeBar: false}}
    />
}
