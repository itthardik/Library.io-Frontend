import { useEffect, useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";
import { BookSchema } from "../types";

const Book = () => {
	const [data, setData] = useState<BookSchema[]>([]);
	const [currPage, setCurrPage] = useState(1);
	const [maxPages, setMaxPages] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchUrl, setSearchUrl] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					searchUrl === ""
						? `https://localhost:7013/api/books?pageSize=5&pageNumber=${currPage}`
						: searchUrl + `&pageNumber=${currPage}`
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const result = await response.json();
				if (result.error && result.type === "System.Exception") {
					setError(result.error);
				} else if (result.error) {
					alert(result.error);
					return;
				}

				setMaxPages(result.maxPages);
				setData(result.data);
				setLoading(false);
			} catch (error: any) {
				setError(error.message);
				setLoading(false);
			}
		};
		fetchData();
	}, [currPage, searchUrl]);

	if (loading) {
		return (
			<h1 className="container d-flex justify-content-center align-items-center h-100">
				Loading...
			</h1>
		);
	}

	if (error) {
		return (
			<div className="container d-flex justify-content-center align-items-center h-100">
				Error: {error}
			</div>
		);
	}

	return (
		<div className="w-100 px-5">
			<h1 className="fw-bold py-5">Manage Books</h1>

			<SearchBar setSearchUrl={setSearchUrl} setCurrPage={setCurrPage} />

			<AddButton />

			<Table
				currPage={currPage}
				setCurrPage={setCurrPage}
				maxPages={maxPages}
				data={data}
			/>
		</div>
	);
};

export default Book;
