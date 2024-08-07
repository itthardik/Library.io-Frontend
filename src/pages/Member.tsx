import { useEffect, useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import AddBookButton from "../components/AddBookButton";
import { BookSchema } from "../types";
import ErrorPage from "./ErrorPage";
import { toast } from "react-toastify";

const Member = () => {
	const [data, setData] = useState<BookSchema[]>([]);
	const [currPage, setCurrPage] = useState(1);
	const [maxPages, setMaxPages] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>();
	const [searchUrl, setSearchUrl] = useState("");
	const [revalidation, setRevalidation] = useState(false);

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
					toast.error(result.error);
					return;
				}

				setMaxPages(result.maxPages);
				setData(result.data);
				setLoading(false);
			} catch (error: any) {
				setError(error);
				setLoading(false);
			}
		};
		fetchData();
	}, [currPage, searchUrl, revalidation]);

	if (loading) {
		return (
			<h1 className="container d-flex justify-content-center align-items-center h-100">
				Loading...
			</h1>
		);
	}

	if (error) {
		return (
			<ErrorPage error={error.message} />
			// <div className="container d-flex justify-content-center align-items-center h-100">
			// 	Error: {error}
			// </div>
		);
	}

	return (
		<div className="w-100 px-5">
			<h2 className="fw-bold py-5">Manage Books</h2>

			<SearchBar setSearchUrl={setSearchUrl} setCurrPage={setCurrPage} />
			<AddBookButton
				revalidation={revalidation}
				setRevalidation={setRevalidation}
			/>

			<Table
				currPage={currPage}
				setCurrPage={setCurrPage}
				maxPages={maxPages}
				data={data}
				tableContents={["title", "authorName", "publisherName"]}
			/>
		</div>
	);
};

export default Member;
