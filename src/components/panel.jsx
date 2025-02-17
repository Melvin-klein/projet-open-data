'use client'

import {useContext} from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {DataContext} from "@/contexts/data-context";
import {ChevronDownIcon} from "@heroicons/react/16/solid";
import Dropdown from "@/components/dropdown";

export default function Panel() {
    const dataContext = useContext(DataContext)

    return (
        <Dialog open={dataContext.panelOpen} onClose={dataContext.setPanelOpen} className="relative" style={{zIndex: 10000}}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <TransitionChild>
                                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                                    <button
                                        type="button"
                                        onClick={() => dataContext.setPanelOpen(false)}
                                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <DialogTitle className="text-base font-semibold text-gray-900">Filtrer les données</DialogTitle>
                                </div>
                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                    <div className="flex">
                                        <div className="w-1/2 pr-2">
                                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                                Année de début
                                            </label>
                                            <div className="mt-2 grid grid-cols-1">
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    defaultValue={dataContext.selectedStartDate}
                                                    onChange={e => dataContext.setSelectedStartDate(parseInt(e.target.value))}
                                                >
                                                    {dataContext.years.map(year => year <= dataContext.selectedEndDate ? <option key={year} value={year}>{year}</option> : null)}
                                                </select>
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-2">
                                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                                Année de fin
                                            </label>
                                            <div className="mt-2 grid grid-cols-1">
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    value={dataContext.selectedEndDate}
                                                    onChange={e => dataContext.setSelectedEndDate(parseInt(e.target.value))}
                                                >
                                                    {dataContext.years.map(year => year >= dataContext.selectedStartDate ? <option key={year} value={year}>{year}</option> : null)}
                                                </select>
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full mt-6">
                                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                            Quartier
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <Dropdown values={dataContext.borough} selected={dataContext.selectedBorough} onSelect={item => dataContext.toggleSelectedBorough(item)} />
                                        </div>
                                    </div>
                                    <div className="w-full mt-6">
                                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                            District
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <Dropdown values={dataContext.districts} selected={dataContext.selectedDistricts} onSelect={item => dataContext.toggleSelectedDistrict(item)} />
                                        </div>
                                    </div>
                                    <button className="border border-gray-300 rounded mt-6 w-full py-2 hover:bg-gray-100">Réinitialiser les filtres</button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
