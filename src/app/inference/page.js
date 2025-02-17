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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            efficitur, quam a ullamcorper facilisis, sapien felis fermentum
                            purus, a dapibus justo justo ut lorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis cupiditate error eum facilis illum ipsa, iure laborum magnam minus modi, nesciunt officiis rem sint sunt totam unde voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores assumenda culpa deleniti, ea eum ex fugiat, nemo, officiis perferendis placeat quibusdam quis rem repellendus sapiente sequi voluptas voluptatum!
                        </p>
                        <Classification />
                    </section>
                    <section id={sections[1].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[1].title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            efficitur, quam a ullamcorper facilisis, sapien felis fermentum
                            purus, a dapibus justo justo ut lorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis cupiditate error eum facilis illum ipsa, iure laborum magnam minus modi, nesciunt officiis rem sint sunt totam unde voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores assumenda culpa deleniti, ea eum ex fugiat, nemo, officiis perferendis placeat quibusdam quis rem repellendus sapiente sequi voluptas voluptatum!
                        </p>
                        <div className="flex">
                            <InfestationRateEvolution />
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
