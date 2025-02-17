import {useEffect, useRef, useState} from "react";

export default function Dropdown({values, selected, onSelect}) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        // Ajoute un écouteur sur le document
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Nettoie l'écouteur quand le composant est démonté
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = value => setSearch(value)

    return <div className="relative w-full" ref={dropdownRef}>
        <button type="button" onClick={() => setOpen(true)} className="inline-flex justify-between border border-stone-300 focus:outline-none ring-0 focus:ring-2 peer col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1 pl-1 pr-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <span className="truncate mx-2">{selected.join(', ') || 'Choisissez des valeurs'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>

        {open &&
            <div className="absolute z-10 w-full mt-2 rounded bg-white ring-2 ring-indigo-200 border border-indigo-500">
                <div className="relative">
                    <input className="block w-full px-4 py-2 text-gray-800 rounded-t border-b focus:outline-none" type="text" placeholder="Rechercher" value={search} onChange={e => handleSearch(e.target.value)} />
                    {search !== '' && <button type="button" className="absolute inset-y-0 right-2 px-2 flex items-center" onClick={() => setSearch('')}>
                        <svg className="h-4 w-4 text-gray-400 hover:text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>}
                </div>

                <div className="rounded-b max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-indigo-100 [&::-webkit-scrollbar-thumb]:bg-indigo-300">
                    {values.map(item => (search === '' || item.startsWith(search)) && <label key={item} form={item} className={`block px-4 py-2 text-gray-700 ${selected.includes(item) ? 'bg-indigo-200 text-indigo-500' : 'hover:bg-indigo-200 hover:text-indigo-500'} cursor-pointer bg-white w-full`}>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id={item} className="w-3 h-3 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0" checked={selected.includes(item)} onChange={() => onSelect(item)} />
                            <span className="truncate sm:text-sm/6">{item}</span>
                        </div>
                    </label>)}
                </div>
            </div>
        }
    </div>
}
