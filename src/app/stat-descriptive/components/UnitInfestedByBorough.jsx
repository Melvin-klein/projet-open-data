import Plot from "react-plotly.js";
import {DataContext} from "@/contexts/data-context";
import {useContext} from "react";

export default function UnitInfestedByBorough() {
    const dataContext = useContext(DataContext)

    const grouped = dataContext.getInfestedUnitsByBorough()

    const xValues = grouped["Borough"].values;
    const infestationValues = grouped["Infested Dwelling Unit Count_sum"].values;

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
