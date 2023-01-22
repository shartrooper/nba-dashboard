import { useEffect, useState } from "react";

const SearchInput = ({ cb, placeholder = "Search Input" }: { cb: (searchTerm?: string) => void, placeholder?: string }) => {
	const [searchTerm, setSearchTerm] = useState<string>();

	useEffect(() => {
		if (searchTerm !== undefined) {
			const debouncer = setTimeout(() => cb(searchTerm), 800);
			return () => clearTimeout(debouncer);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm])

	function handleChange({ target: { value } }: { target: { value?: string } }) {
		setSearchTerm(value);
	}

	return <input
		className="text-midnight w-full rounded border-2 focus:outline-none focus:ring focus:ring-basketball px-2 sm:w-56 lg:w-72"
		placeholder={placeholder}
		onChange={handleChange}
	/>
}

export default SearchInput;