import { EraserIcon } from "lucide-react";
import { useState } from "react";

export default function Filter({ onSearch }: { onSearch: (value: string) => void }) {
    const [search, setSearch] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        onSearch(value); // 🔥 on envoie au parent
    }

    return (
        <div className="flex items-center gap-4 m-2 rounded-full border border-gray-200 px-4 py-2 ">
            <input
                type="text"
                placeholder="Rechercher ..."
                value={search}
                onChange={handleChange}
                className="border px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-1"
            />
            {search && (
                <button onClick={() => { setSearch(""); onSearch(""); }} className="text-gray-500 hover:text-gray-700">
                    <EraserIcon />
                </button>
            )}

        </div>
    );
}