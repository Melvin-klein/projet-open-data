import {useContext} from "react";
import {DataContext} from "@/contexts/data-context";

export default function InfestationRate() {
    const dataContext = useContext(DataContext)

    const data = dataContext.computeInfestationRateTable()
    const statKeys = ['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max']

    return <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3 min-w-24">Stat.</th>
                        {data.columns.map((column, index) => {
                            return <th key={index} scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3 min-w-48">
                                {column}
                            </th>
                        })}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {data.values.map((row, indexRow) => {
                        return (
                            <tr key={indexRow}>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black font-bold">{statKeys[indexRow]}</td>
                                {row.map((item, indexCol) => <td key={`${indexRow}-${indexCol}`} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Number.isInteger(item) ? item.toString() : item.toFixed(5)}</td>)}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}
