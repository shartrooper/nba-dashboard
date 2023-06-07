import { useEffect, useState } from "react";
import Input from "../Input/generic";

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

	return <Input onChange={handleChange} placeholder={placeholder} />
}

export default SearchInput;