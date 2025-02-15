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

export default function Page() {
    const [activeId, setActiveId] = useState("");

    const sections = [
        { id: "bedbug-data-description", title: "Description du jeu de données Bedbugs" },
        { id: "bedbug-data-rate-evolution", title: "Évolution des taux d'infestation" },
        { id: "bedbug-data-evolution", title: "Évolution du nombre d'infestation" },
        { id: "bedbug-data-unit-infested-by-borough", title: "Nombre d'unités infestées par quartiers" },
        { id: "bedbug-data-map-mean-infestations", title: "Carte des infestations moyennes par district" },
        { id: "bedbug-data-top-infestation-rate", title: "Top taux infestation" },
        { id: "bedbug-data-map-total-infestation", title: "Carte des infestations totales par districts" },
        { id: "bedbug-data-top-10-infested-district", title: "Top 10 des districts les plus infestés" },
        { id: "bedbug-data-map-loyer-moyen-district", title: "Carte des loyens moyen par district" },
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
                        <InfestationRate />
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
                    <section id={sections[2].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[2].title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            efficitur, quam a ullamcorper facilisis, sapien felis fermentum
                            purus, a dapibus justo justo ut lorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis cupiditate error eum facilis illum ipsa, iure laborum magnam minus modi, nesciunt officiis rem sint sunt totam unde voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores assumenda culpa deleniti, ea eum ex fugiat, nemo, officiis perferendis placeat quibusdam quis rem repellendus sapiente sequi voluptas voluptatum!
                        </p>
                        <div className="flex">
                            <InfestationBedbugs />
                        </div>
                    </section>
                    <section id={sections[3].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[3].title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            efficitur, quam a ullamcorper facilisis, sapien felis fermentum
                            purus, a dapibus justo justo ut lorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis cupiditate error eum facilis illum ipsa, iure laborum magnam minus modi, nesciunt officiis rem sint sunt totam unde voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores assumenda culpa deleniti, ea eum ex fugiat, nemo, officiis perferendis placeat quibusdam quis rem repellendus sapiente sequi voluptas voluptatum!
                        </p>
                        <div className="flex">
                            <UnitInfestedByBorough />
                        </div>
                    </section>
                    <section id={sections[4].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[4].title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            efficitur, quam a ullamcorper facilisis, sapien felis fermentum
                            purus, a dapibus justo justo ut lorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis cupiditate error eum facilis illum ipsa, iure laborum magnam minus modi, nesciunt officiis rem sint sunt totam unde voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores assumenda culpa deleniti, ea eum ex fugiat, nemo, officiis perferendis placeat quibusdam quis rem repellendus sapiente sequi voluptas voluptatum!
                        </p>
                        <div className="flex">
                            <MapMeanInfested />
                        </div>
                    </section>
                    <section id={sections[5].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[5].title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            efficitur, quam a ullamcorper facilisis, sapien felis fermentum
                            purus, a dapibus justo justo ut lorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis cupiditate error eum facilis illum ipsa, iure laborum magnam minus modi, nesciunt officiis rem sint sunt totam unde voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores assumenda culpa deleniti, ea eum ex fugiat, nemo, officiis perferendis placeat quibusdam quis rem repellendus sapiente sequi voluptas voluptatum!
                        </p>
                        <div className="flex">
                            <TopTauxInfestation />
                        </div>
                    </section>
                    <section id={sections[6].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[6].title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            efficitur, quam a ullamcorper facilisis, sapien felis fermentum
                            purus, a dapibus justo justo ut lorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis cupiditate error eum facilis illum ipsa, iure laborum magnam minus modi, nesciunt officiis rem sint sunt totam unde voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores assumenda culpa deleniti, ea eum ex fugiat, nemo, officiis perferendis placeat quibusdam quis rem repellendus sapiente sequi voluptas voluptatum!
                        </p>
                        <div className="flex">
                            <CarteInfestationTotale />
                        </div>
                    </section>
                    <section id={sections[7].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[7].title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            efficitur, quam a ullamcorper facilisis, sapien felis fermentum
                            purus, a dapibus justo justo ut lorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis cupiditate error eum facilis illum ipsa, iure laborum magnam minus modi, nesciunt officiis rem sint sunt totam unde voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores assumenda culpa deleniti, ea eum ex fugiat, nemo, officiis perferendis placeat quibusdam quis rem repellendus sapiente sequi voluptas voluptatum!
                        </p>
                        <div className="flex">
                            {/*<Top10DistrictsInfeste />*/}
                        </div>
                    </section>
                    <section id={sections[8].id} className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-4">{sections[8].title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            efficitur, quam a ullamcorper facilisis, sapien felis fermentum
                            purus, a dapibus justo justo ut lorem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi corporis cupiditate error eum facilis illum ipsa, iure laborum magnam minus modi, nesciunt officiis rem sint sunt totam unde voluptatum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam architecto asperiores assumenda culpa deleniti, ea eum ex fugiat, nemo, officiis perferendis placeat quibusdam quis rem repellendus sapiente sequi voluptas voluptatum!
                        </p>
                        <div className="flex">
                            <CarteLoyerMoyenDistrict />
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
