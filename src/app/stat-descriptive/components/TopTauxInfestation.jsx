import Plot from "react-plotly.js";
import {useContext} from "react";
import {DataContext} from "@/contexts/data-context";

export default function TopTauxInfestation() {
    const dataContext = useContext(DataContext)

    const grouped = dataContext.topTauxInfestation()

    const xValues = grouped["CDTA2020"].values;
    const infestationValues = grouped["taux_infestation_mean"].values;

    return <Plot
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
    />
}
