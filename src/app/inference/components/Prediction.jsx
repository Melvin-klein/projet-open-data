import {useContext} from "react";
import {DataContext} from "@/contexts/data-context";

export default function Prediction() {
    const dataContext = useContext(DataContext)

    const grouped = dataContext.topTauxInfestation()

    const xValues = grouped["CDTA2020"].values;
    const infestationValues = grouped["taux_infestation_mean"].values;

    return <div>
        <img src="https://melvin-klein.github.io/projet-open-data/outputLinearModel.png"  alt="" className="block mt-4" />
        <img src="https://melvin-klein.github.io/projet-open-data/ouputCoefLinearModel.png"  alt="" className="block mt-4" />
    </div>
}
