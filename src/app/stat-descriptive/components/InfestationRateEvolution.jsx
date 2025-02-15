import Plot from 'react-plotly.js';
import {useContext} from "react";
import {DataContext} from "@/contexts/data-context";

export default function InfestationRateEvolution() {
    const dataContext = useContext(DataContext)

    const grouped = dataContext.getInfestationRateEvolution()

    const xValues = grouped["annee_fin_observation"].values;
    const infestationValues = grouped["taux_infestation_mean"].values;
    const eradicationValues = grouped["taux_eradication_mean"].values;
    const reinfestationValues = grouped["taux_reinfestation_mean"].values;

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
            {
                x: xValues,
                y: eradicationValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'blue'},
                name: 'Éradication'
            },
            {
                x: xValues,
                y: reinfestationValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'green'},
                name: 'Réinfestation'
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
