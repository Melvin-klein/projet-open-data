"use client";

import { useState } from "react";
import Link from "next/link";
import InfestationRate from "@/app/stat-descriptive/components/infestation-rate";
import InfestationRateEvolution from "@/app/stat-descriptive/components/InfestationRateEvolution";
import InfestationBedbugs from "@/app/stat-descriptive/components/infestationBedbugs";
import UnitInfestedByBorough from "@/app/stat-descriptive/components/UnitInfestedByBorough";
import MapMeanInfested from "@/app/stat-descriptive/components/MapMeanInfested";
import TopTauxInfestation from "@/app/stat-descriptive/components/TopTauxInfestation";
import CarteInfestationTotale from "@/app/stat-descriptive/components/CarteInfestationTotale";
import CarteLoyerMoyenDistrict from "@/app/stat-descriptive/components/CarteLoyerMoyenDistrict";
import Classification from "@/app/inference/components/Classification";
import Prediction from "@/app/inference/components/Prediction";

export default function Inference() {
    const [activeId, setActiveId] = useState("");

    const sections = [
        { id: "classification", title: "Classification" },
        { id: "prediction", title: "Prédiction" },
    ];

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-12 mt-24">
            <div className="flex min-h-screen">
                {/* Colonne principale */}
                <main className="w-3/4 pr-6 space-y-12">
                    <section id={sections[0].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[0].title}</h2>
                        <p>
                            Avec les K-means, on a fait des groupe de quartiers qui se ressemblent en prenant en compte les taux d’infestation, ré-infestation et éradication; mais aussi les pourcentage de population en dessous du seuil de pauvreté, des moins de 18 ans en dessous du seuil de pauvreté et des plus de 65 ans.
                            Ci-dessous la carte de ces groupes et leurs caractéristiques moyennes.
                        </p>
                        <Classification />
                    </section>
                    <section id={sections[1].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[1].title}</h2>
                        <p>
                            Avec un modèle de régression linéaire, nous avons prédit les taux d'infestation pour 2024 (avec les données 2023, car on ne connaît les données de 2024 qu’en 2025). Et on constate qu’elles sont sur-estimées ce qui est normal, cependant elles sont dans l’intervalle de confiance à 95 %. L’erreur quadratique moyenne vaut ~10^-5 et nos valeurs sont de l’ordre de 10^-3.
                        </p>
                        <div className="flex">
                            <Prediction />
                        </div>
                    </section>
                </main>

                {/* Colonne des liens */}
                <aside className="w-1/4 p-4 sticky top-10 h-fit">
                    <nav className="border-l-2 border-gray-300 pl-4">
                        <ul className="space-y-3">
                            {sections.map(({ id, title }) => (
                                <li key={id}>
                                    <Link
                                        href={`#${id}`}
                                        className={`block text-blue-600 hover:text-blue-400 transition ${
                                            activeId === id ? "font-bold underline" : ""
                                        }`}
                                    >
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
            </div>
        </div>
    );
}
