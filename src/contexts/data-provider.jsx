import {DataContext} from "@/contexts/data-context";
import {useEffect, useState} from "react";
import * as dfd from "danfojs";
import Spinner from "@/components/spinner";

export default function DataProvider({children}) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [geojsonData, setGeojsonData] = useState(null);
    const [panelOpen, setPanelOpen] = useState(false)

    const position = [40.7142700, -74.0059700]

    useEffect(() => {
        if (data === null) {
            async function fetchCSV() {
                try {
                    console.log("Reading CSV ...")
                    const df = await dfd.readCSV('https://melvin-klein.github.io/projet-open-data/bedbugs_population.csv');
                    setData(df);
                    console.log(df.columns)
                    setIsLoading(false)
                } catch (error) {
                    console.error("Erreur de chargement du CSV:", error);
                }
            }

            fetchCSV().then(() => console.log("Data loaded !"));
        }
    }, []);

    useEffect(() => {
        if (geojsonData === null) {
            const fetchGeoJSON = async () => {
                try {
                    const response = await fetch('https://melvin-klein.github.io/projet-open-data/nyc.json');
                    const data = await response.json();
                    setGeojsonData(data);
                } catch (error) {
                    console.error("Erreur lors du chargement du GeoJSON :", error);
                }
            };

            fetchGeoJSON();
        }
    }, []);

    const computeInfestationRateTable = () => {
        return data.loc({columns: ["taux_infestation", "taux_eradication", "taux_reinfestation"]}).describe();
    }

    const getInfestationRateEvolution = () => {
        return data.groupby(["annee_fin_observation"])
            .agg({ "taux_infestation": "mean", "taux_eradication": "mean", "taux_reinfestation": "mean" })
    }

    const getInfestationBedbug = () => {
        return data.groupby(["annee_fin_observation"]).col(["Infested Dwelling Unit Count"]).agg({ "Infested Dwelling Unit Count": "sum" })
    }

    const getInfestedUnitsByBorough = () => {
        let grouped = data.groupby(["Borough"])
            .col(["Infested Dwelling Unit Count"])
            .agg({ "Infested Dwelling Unit Count": "sum" });

        return grouped.sortValues("Infested Dwelling Unit Count_sum", { ascending: false }).head(5)
    }

    const getMeanInfestationGeoData = () => {
        const grouped = data.groupby(["CDTA2020"]).agg({ "taux_infestation": "mean" });

        // Convertir en un objet pour un mapping rapide
        const infestationMap = {};
        grouped.index.forEach((idx, i) => {
            infestationMap[grouped.CDTA2020.values[i]] = grouped["taux_infestation_mean"].values[i];
        });

        // Ajouter la moyenne d'infestation au GeoJSON
        return {
            infestation_max: Math.max(...grouped["taux_infestation_mean"].values),
            infestation_min: Math.min(...grouped["taux_infestation_mean"].values),
            ...geojsonData,
            features: geojsonData.features.map((feature) => {
                const districtCode = feature.properties.CDTA2020;
                return {
                    ...feature,
                    properties: {
                        ...feature.properties,
                        avg_infestation: infestationMap[districtCode] || 0, // Valeur par défaut 0 si non trouvé
                    },
                };
            }),
        };
    };

    const topTauxInfestation = () => {
        let grouped = data.groupby(["CDTA2020"])
            .col(["taux_infestation"])
            .agg({ "taux_infestation": "mean" });

        return grouped.sortValues("taux_infestation_mean", { ascending: false }).head(10)
    }

    const carteInfestationTotale = () => {
        const grouped = data.groupby(["CDTA2020"]).agg({ "Infested Dwelling Unit Count": "sum" });

        // Convertir en un objet pour un mapping rapide
        const infestationMap = {};
        grouped.index.forEach((idx, i) => {
            infestationMap[grouped.CDTA2020.values[i]] = grouped["Infested Dwelling Unit Count_sum"].values[i];
        });

        // Ajouter la moyenne d'infestation au GeoJSON
        return {
            infestation_max: Math.max(...grouped["Infested Dwelling Unit Count_sum"].values),
            infestation_min: Math.min(...grouped["Infested Dwelling Unit Count_sum"].values),
            ...geojsonData,
            features: geojsonData.features.map((feature) => {
                const districtCode = feature.properties.CDTA2020;
                return {
                    ...feature,
                    properties: {
                        ...feature.properties,
                        avg_infestation: infestationMap[districtCode] || 0, // Valeur par défaut 0 si non trouvé
                    },
                };
            }),
        };
    };

    const top10DistrictsInfeste = () => {
        let grouped = data.groupby(["CDTA2020"])
            .col(["Infested Dwelling Unit Count"])
            .agg({ "Infested Dwelling Unit Count": "sum" });

        return grouped.sortValues("Infested Dwelling Unit Count_sum", { ascending: false }).head(10)
    }

    const carteLoyerMoyenDistrict = () => {
        const grouped = data.groupby(["CDTA2020"]).agg({ "rent_gross_med_adj": "mean" });

        // Convertir en un objet pour un mapping rapide
        const infestationMap = {};
        grouped.index.forEach((idx, i) => {
            infestationMap[grouped.CDTA2020.values[i]] = grouped["rent_gross_med_adj_mean"].values[i];
        });

        // Ajouter la moyenne d'infestation au GeoJSON
        return {
            infestation_max: Math.max(...grouped["rent_gross_med_adj_mean"].values),
            infestation_min: Math.min(...grouped["rent_gross_med_adj_mean"].values),
            ...geojsonData,
            features: geojsonData.features.map((feature) => {
                const districtCode = feature.properties.CDTA2020;
                return {
                    ...feature,
                    properties: {
                        ...feature.properties,
                        avg_infestation: infestationMap[districtCode] || 0, // Valeur par défaut 0 si non trouvé
                    },
                };
            }),
        };
    };

    return <DataContext.Provider value={{
        data,
        setData,
        isLoading,
        setIsLoading,
        panelOpen,
        setPanelOpen,
        geojsonData,
        position,
        computeInfestationRateTable,
        getInfestationRateEvolution,
        getInfestationBedbug,
        getInfestedUnitsByBorough,
        getMeanInfestationGeoData,
        topTauxInfestation,
        carteInfestationTotale,
        top10DistrictsInfeste,
        carteLoyerMoyenDistrict
    }}>
        {isLoading ? <div className="flex items-center justify-center"><Spinner /></div> : children}
    </DataContext.Provider>
}
