import { useEffect, useState } from "react";

const SearchInput = ({ cb, placeholder = "Search Input" }: { cb: (searchTerm?: string) => void, placeholder?: string }) => {
	const [searchTerm, setSearchTerm] = useState<string>();

	useEffect(() => {
		const debouncer = setTimeout(() => cb(searchTerm), 800);
		return () => clearTimeout(debouncer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm])

	function handleChange({ target: { value } }: { target: { value?: string } }) {
		setSearchTerm(value);
	}

	return <input
		className="text-chalkboard"
		placeholder={placeholder}
		onChange={handleChange}
	/>
}

export default SearchInput;