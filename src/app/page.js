"use client"

import Datatable from "@/components/datatable";
import Spinner from "@/components/spinner";
import {useContext, useEffect} from "react";
import DataProvider from "@/contexts/data-provider";
import {DataContext} from "@/contexts/data-context";
import dynamic from "next/dynamic";
import Footer from "@/components/footer";
const MapComponent = dynamic(() => import("@/components/map-component"), {
    ssr: false
});

export default function Home() {
    return (
        <DataProvider>
            <Content />
        </DataProvider>
    );
}

function Content() {
    const dataContext = useContext(DataContext)

    return <div className="pt-12">
        {dataContext.isLoading ? <div className="flex items-center justify-center"><Spinner /></div> : <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-12">
                <h1 className="text-4xl">Projet Open Data</h1>
                <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dignissimos dolorem doloribus dolorum, expedita mollitia natus nemo nobis perspiciatis quasi quidem ratione rem sequi similique tempore tenetur unde. Debitis, placeat?</p>
            </div>
            <MapComponent />
            <Datatable />
        </>
        }
        <Footer />
    </div>
}
