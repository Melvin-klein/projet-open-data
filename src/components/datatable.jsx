import {useContext} from "react";
import {DataContext} from "@/contexts/data-context";

export default function Datatable() {
    const dataContext = useContext(DataContext)

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-24">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">Données disponibles</h1>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    {dataContext.filteredData.columns.map(column => {
                                        return <th key={column} scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 min-w-48">
                                            {column}
                                        </th>
                                    })}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {dataContext.filteredData.head(10).values.map((row, indexRow) => {
                                        return (
                                            <tr key={indexRow}>
                                                {row.map((item, indexCol) => <td key={`${indexRow}-${indexCol}`} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item}</td>)}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
