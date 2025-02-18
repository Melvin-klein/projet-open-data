"use client"

import Datatable from "@/components/datatable";
import Spinner from "@/components/spinner";
import {useContext, useEffect} from "react";
import {DataContext} from "@/contexts/data-context";
import dynamic from "next/dynamic";
import Footer from "@/components/footer";
const MapComponent = dynamic(() => import("@/components/map-component"), {
    ssr: false
});

export default function Home() {
    const dataContext = useContext(DataContext)

    return <div className="pt-12">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-12">
            <h1 className="text-4xl">Projet Open Data</h1>
            <p className="mt-4">Ce projet Open Data traite des infestations de punaise de lit dans la ville de New York entre 2018 et 2024.
                Pour cela, on s'est appuyé sur les données ouvertes de la ville de New York et en particulier sur deux jeux de données.
                Le premier recense la présence de punaises de lit dans la ville tandis que l'autre contient des informations sociodémographiques sur ses habitants.
                Ces données peuvent être retrouvées sur le site de la <a href="https://data.cityofnewyork.us/Housing-Development/Bedbug-Reporting/wz6d-d3jb/about_data" target="_blank" className="text-indigo-500 hover:underline">ville de New York</a> et du <a href="https://furmancenter.org/coredata/userguide/data-downloads" target="_blank" className="text-indigo-500 hover:underline">NYU Furman Center</a>.
            </p>
            <p className="mt-2">
                La ville de New York est divisée en 5 grands quartiers (Bronx, Brooklyn, Manhattan, Queens et Staten Island) qui sont eux même divisés en districts.
                C'est ce que l'on peut observer sur la carte ci-dessous.
            </p>
        </div>
        <MapComponent />
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-12 mt-4">
            <p>Les données quand à elles ont été regroupées en un seul jeu de données présenté ci-dessous. Chaque ligne représente les données pour un couple district/année. Les colonnes sont :</p>
            <ul className="pl-8 mt-4">
                <li>CDTA2020 : Code d'identification du district</li>
                <li>annee_fin_observation : Année d'observation</li>
                <li># of Dwelling Units : Nombre d'unités habitables</li>
                <li>Infested Dwelling Unit Count : Nombre de logements infestés</li>
                <li>Eradicated Unit Count : Nombre d'unités où une éradication à eu lieu</li>
                <li>Re-infested Dwelling Unit Count : Nombre d'unités où une réinfestation est survenue</li>
                <li>taux_infestation : Rapport entre le nombre d'unités infestées et le nombre total d'unités</li>
                <li>taux_eradication : Rapport entre le nombre d'eradication et le nombre total d'unités</li>
                <li>taux_reinfestation : Rapport entre le nombre de réinfestation et le nombre total d'unités</li>
                <li>Borough : Nom du quartier</li>
                <li>pop_num : Taille de la population</li>
                <li>population_density : Densité de la population</li>
                <li>pop_pov_pct : Pourcentage de pauvreté</li>
                <li>pop_pov_u18_pct : Pourcentage de pauvreté chez les mineurs</li>
                <li>pop_65p_pct : Pourcentage de pauvreté chez les personnes de 65 ans et plus.</li>
                <li>unit_num : Nombre d'unités</li>
                <li>unit_occ_own_pct : Rapport entre le nombre d'unités occupées par leur propriétaire et le nombre total d'unités.</li>
                <li>rent_burden_med : Revenu brut médian avant impôts dépensé en loyer brut</li>
                <li>med_r_1f : Prix médian pour une unité de 1 personne</li>
                <li>med_r_4f : Prix médian pour une unité de 2 à 4 personnes</li>
                <li>med_r_cn : Prix médian d'un condomidium</li>
                <li>med_r_ot : Prix médian pour un bâtiment multi-familiale</li>
                <li>rent_gross_med_adj : Salaire brut médian</li>
            </ul>
        </div>
        <Datatable />
    </div>
}
