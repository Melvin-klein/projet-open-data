import {DataContext} from "@/contexts/data-context";
import {useEffect, useState} from "react";
import * as dfd from "danfojs";
import Spinner from "@/components/spinner";
import {kmeans} from "ml-kmeans";
import * as tf from '@tensorflow/tfjs';

export default function DataProvider({children}) {
    const position = [40.7142700, -74.0059700]
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024]
    const districts = [
        "BK01",
        "BK02",
        "BK03",
        "BK04",
        "BK05",
        "BK06",
        "BK07",
        "BK08",
        "BK09",
        "BK10",
        "BK11",
        "BK12",
        "BK13",
        "BK14",
        "BK15",
        "BK16",
        "BK17",
        "BK18",
        "BX01",
        "BX02",
        "BX03",
        "BX04",
        "BX05",
        "BX06",
        "BX07",
        "BX08",
        "BX09",
        "BX10",
        "BX11",
        "BX12",
        "BX26",
        "MN01",
        "MN02",
        "MN03",
        "MN04",
        "MN05",
        "MN06",
        "MN07",
        "MN08",
        "MN09",
        "MN10",
        "MN11",
        "MN12",
        "QN01",
        "QN02",
        "QN03",
        "QN04",
        "QN05",
        "QN06",
        "QN07",
        "QN08",
        "QN09",
        "QN10",
        "QN11",
        "QN12",
        "QN13",
        "QN14",
        "QN81",
        "SI01",
        "SI02",
        "SI03"
    ]
    const borough = [
        "MANHATTAN",
        "BROOKLYN",
        "BRONX",
        "STATEN ISLAND",
        "QUEENS"
    ]

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [filteredData, setFilteredData] = useState(null)
    const [geojsonData, setGeojsonData] = useState(null)
    const [geojsonDataFiltered, setGeojsonDataFiltered] = useState(null)
    const [panelOpen, setPanelOpen] = useState(false)
    const [selectedStartDate, setSelectedStartDate] = useState(years[0])
    const [selectedEndDate, setSelectedEndDate] = useState(years[years.length - 1])
    const [selectedDistricts, setSelectedDistricts] = useState([])
    const [selectedBorough, setSelectedBorough] = useState([])

    useEffect(() => {
        if (data === null) {
            async function fetchCSV() {
                try {
                    console.log("Reading CSV ...")
                    let df = await dfd.readCSV('https://melvin-klein.github.io/projet-open-data/bedbugs_population.csv');
                    df = df.fillNa(0)
                    setData(df);
                    setFilteredData(df)
                    console.log(df.columns)
                    console.log(df.dtypes)
                    console.log(df['CDTA2020'].unique().values)
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
                    setGeojsonDataFiltered(data)
                    console.log("GeoJson est chargé")
                } catch (error) {
                    console.error("Erreur lors du chargement du GeoJSON :", error);
                }
            };

            fetchGeoJSON();
        }
    }, []);

    useEffect(() => {
        if (data !== null) {
            let filtered_df = data.query(data["annee_fin_observation"].ge(selectedStartDate).and(data["annee_fin_observation"].le(selectedEndDate)));

            if (selectedDistricts.length > 0 || selectedBorough.length > 0) {
                const filteredByBorough = filtered_df["Borough"].map((borough) => selectedBorough.includes(borough)).values
                const filteredByDistrict = filtered_df["CDTA2020"].map((district) => selectedDistricts.includes(district)).values
                filtered_df = filtered_df.loc({
                    rows : filteredByBorough.map((value, index) => value || filteredByDistrict[index])
                })
            }

            setFilteredData(filtered_df)
        }

        if (geojsonData !== null) {
            if (selectedDistricts.length > 0 || selectedBorough.length > 0) {
                setGeojsonDataFiltered({
                        ...geojsonData,
                        features: geojsonData.features.filter(feature => (
                            selectedDistricts.includes(feature.properties.CDTA2020) || selectedBorough.includes(feature.properties.BoroName.toUpperCase())
                        )),
                    }
                )
            } else {
                setGeojsonDataFiltered(geojsonData)
            }
        }
    }, [selectedStartDate, selectedEndDate, selectedDistricts, selectedBorough])

    const computeInfestationRateTable = () => {
        return filteredData.loc({columns: ["taux_infestation", "taux_eradication", "taux_reinfestation"]}).describe();
    }

    const getInfestationRateEvolution = () => {
        return filteredData.groupby(["annee_fin_observation"])
            .agg({ "taux_infestation": "mean", "taux_eradication": "mean", "taux_reinfestation": "mean" })
    }

    const getInfestationBedbug = () => {
        return filteredData.groupby(["annee_fin_observation"]).col(["Infested Dwelling Unit Count"]).agg({ "Infested Dwelling Unit Count": "sum" })
    }

    const getInfestedUnitsByBorough = () => {
        let grouped = filteredData.groupby(["Borough"])
            .col(["Infested Dwelling Unit Count"])
            .agg({ "Infested Dwelling Unit Count": "sum" });

        return grouped.sortValues("Infested Dwelling Unit Count_sum", { ascending: false }).head(5)
    }

    const getMeanInfestationGeoData = () => {
        const grouped = filteredData.groupby(["CDTA2020"]).agg({ "taux_infestation": "mean" });

        // Convertir en un objet pour un mapping rapide
        const infestationMap = {};
        grouped.index.forEach((idx, i) => {
            infestationMap[grouped.CDTA2020.values[i]] = grouped["taux_infestation_mean"].values[i];
        });

        // Ajouter la moyenne d'infestation au GeoJSON
        return {
            infestation_max: Math.max(...grouped["taux_infestation_mean"].values),
            infestation_min: Math.min(...grouped["taux_infestation_mean"].values),
            ...geojsonDataFiltered,
            features: geojsonDataFiltered.features.map((feature) => {
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
        let grouped = filteredData.groupby(["CDTA2020"])
            .col(["taux_infestation"])
            .agg({ "taux_infestation": "mean" });

        return grouped.sortValues("taux_infestation_mean", { ascending: false }).head(10)
    }

    const carteInfestationTotale = () => {
        const grouped = filteredData.groupby(["CDTA2020"]).agg({ "Infested Dwelling Unit Count": "sum" });

        // Convertir en un objet pour un mapping rapide
        const infestationMap = {};
        grouped.index.forEach((idx, i) => {
            infestationMap[grouped.CDTA2020.values[i]] = grouped["Infested Dwelling Unit Count_sum"].values[i];
        });

        // Ajouter la moyenne d'infestation au GeoJSON
        return {
            infestation_max: Math.max(...grouped["Infested Dwelling Unit Count_sum"].values),
            infestation_min: Math.min(...grouped["Infested Dwelling Unit Count_sum"].values),
            ...geojsonDataFiltered,
            features: geojsonDataFiltered.features.map((feature) => {
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
        const grouped = filteredData.groupby(["CDTA2020"]).agg({ "rent_gross_med_adj": "mean" });

        // Convertir en un objet pour un mapping rapide
        const infestationMap = {};
        grouped.index.forEach((idx, i) => {
            infestationMap[grouped.CDTA2020.values[i]] = grouped["rent_gross_med_adj_mean"].values[i];
        });

        // Ajouter la moyenne d'infestation au GeoJSON
        return {
            infestation_max: Math.max(...grouped["rent_gross_med_adj_mean"].values),
            infestation_min: Math.min(...grouped["rent_gross_med_adj_mean"].values),
            ...geojsonDataFiltered,
            features: geojsonDataFiltered.features.map((feature) => {
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

    const toggleSelectedDistrict = district => {
        if (selectedDistricts.includes(district)) {
            setSelectedDistricts(selectedDistricts.filter(item => item !== district))
        } else {
            setSelectedDistricts([district, ...selectedDistricts])
        }
    }

    const toggleSelectedBorough = borough => {
        if (selectedBorough.includes(borough)) {
            setSelectedBorough(selectedBorough.filter(item => item !== borough))
        } else {
            setSelectedBorough([borough, ...selectedBorough])
        }
    }

    const trainKMeans = (num_clusters) => {

        console.log("training")
        const values = filteredData.loc({ columns : ['taux_infestation', 'taux_eradication', 'taux_reinfestation', 'pop_pov_pct', 'pop_pov_u18_pct', 'pop_65p_pct'] }).values
        console.log(values)
        const model = kmeans(values, num_clusters, { initialization: 'kmeans++', maxIterations: 100 })
        console.log("Finished")
        console.log(model)

        const district2cluster = filteredData['CDTA2020']
        const clusters = model.clusters

        return [{
            infestation_max: num_clusters - 1,
            infestation_min: 0,
            ...geojsonDataFiltered,
            features: geojsonDataFiltered.features.map((feature) => {
                const districtCode = feature.properties.CDTA2020;
                return {
                    ...feature,
                    properties: {
                        ...feature.properties,
                        avg_infestation: clusters[district2cluster.values.indexOf(districtCode)] || 0, // Valeur par défaut 0 si non trouvé
                    },
                };
            }),
        }, filteredData.addColumn('clusters', clusters)];
    }

    return <DataContext.Provider value={{
        data,
        filteredData,
        isLoading,
        setIsLoading,
        panelOpen,
        setPanelOpen,
        selectedStartDate,
        setSelectedStartDate,
        selectedEndDate,
        setSelectedEndDate,
        selectedDistricts,
        setSelectedDistricts,
        toggleSelectedDistrict,
        selectedBorough,
        setSelectedBorough,
        toggleSelectedBorough,
        geojsonData,
        geojsonDataFiltered,
        position,
        years,
        districts,
        borough,
        computeInfestationRateTable,
        getInfestationRateEvolution,
        getInfestationBedbug,
        getInfestedUnitsByBorough,
        getMeanInfestationGeoData,
        topTauxInfestation,
        carteInfestationTotale,
        top10DistrictsInfeste,
        carteLoyerMoyenDistrict,
        trainKMeans,
    }}>
        {isLoading ? <div className="flex items-center justify-center"><Spinner /></div> : children}
    </DataContext.Provider>
}
