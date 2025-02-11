import {DataContext} from "@/contexts/data-context";
import {useEffect, useState} from "react";
import * as dfd from "danfojs";
import {log} from "next/dist/server/typescript/utils";

export default function DataProvider({children}) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        async function fetchCSV() {
            try {
                console.log("Reading CSV ...")
                const df = await dfd.readCSV("/bedbugs.csv");
                setData(df);
                console.log(df.columns)
                setIsLoading(false)
            } catch (error) {
                console.error("Erreur de chargement du CSV:", error);
            }
        }

        fetchCSV().then(() => console.log("Data loaded !"));
    }, []);

    return <DataContext.Provider value={{data, setData, isLoading, setIsLoading}}>
        {children}
    </DataContext.Provider>
}
