import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";

type KeyValueMap<T> = {
	[K in keyof T]?: T[K];
};

function updateObject<T>(obj: T, updates: KeyValueMap<T>): T {
	return { ...obj, ...updates };
}

const SearchBar = ({
	setSearchUrl,
	setCurrPage,
}: {
	setSearchUrl: React.Dispatch<React.SetStateAction<string>>;
	setCurrPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
	//States
	const [searchValue, setSearchValue] = useState("");
	const [hideParams, setHideParams] = useState(true);
	const [searchParams, setSearchParams] = useState({
		Title: true,
		AuthorName: false,
		Genre: false,
		PublisherName: false,
	});
	///Toogle params based on click inputs
	const ParamsToggle = (paramName: string) => {
		if (paramName === "Title")
			setSearchParams(
				updateObject(searchParams, { Title: !searchParams.Title })
			);
		else if (paramName === "AuthorName")
			setSearchParams(
				updateObject(searchParams, { AuthorName: !searchParams.AuthorName })
			);
		else if (paramName === "Genre")
			setSearchParams(
				updateObject(searchParams, { Genre: !searchParams.Genre })
			);
		else if (paramName === "PublisherName")
			setSearchParams(
				updateObject(searchParams, {
					PublisherName: !searchParams.PublisherName,
				})
			);
	};
	//handel submit form
	const handelSubmit = () => {
		if (searchValue === "") return;

		var param = "";
		Object.entries(searchParams).forEach(([key, value]) => {
			if (value === true) {
				param += `&${key}=${searchValue}`;
			}
		});

		if (param === "") return;

		setHideParams(false);
		setCurrPage(1);
		setSearchUrl("https://localhost:7013/api/books/search?pageSize=5" + param);
	};

	return (
		<div className="my-3 d-flex flex-column align-items-center">
			{/* Search Form */}
			<div
				className="w-100 p-3 d-flex justify-content-evenly align-items-center"
				style={{
					backgroundColor: "rgba(23, 32, 109, 0.1)",
					borderRadius: 15,
				}}
			>
				<GiHamburgerMenu
					className="fs-2"
					onClick={() => {
						setHideParams(!hideParams);
					}}
				/>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handelSubmit();
					}}
					style={{ width: "85%" }}
				>
					<input
						type="text"
						placeholder="Search here"
						className="border-0 fs-4 ps-2 w-100"
						style={{
							outline: "none",
							backgroundColor: "rgba(23, 32, 109, 0)",
						}}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
						value={searchValue}
						required
					/>
				</form>
				<GoSearch
					className="fs-2"
					style={{ cursor: "pointer" }}
					onClick={handelSubmit}
				/>
			</div>
			{/* Search Params */}
			<div
				className="w-100 p-3 flex-wrap gap-2 justify-content-evenly align-items-center"
				style={{ display: hideParams ? "none" : "flex" }}
			>
				{Object.entries(searchParams).map(([key, value]) => {
					return (
						<div
							className="border py-1 px-3"
							key={key}
							style={{
								borderRadius: "8px",
								cursor: "pointer",
								backgroundColor: value ? "#17206D" : "white",
								color: value ? "white" : "black",
							}}
							onClick={() => ParamsToggle(key)}
						>
							{key}
						</div>
					);
				})}
				{/* Clear Filters */}
				<div
					className="py-1 px-3"
					style={{
						borderRadius: "8px",
						cursor: "pointer",
						backgroundColor: "red",
						color: "white",
					}}
					onClick={() => {
						setSearchParams({
							Title: true,
							AuthorName: false,
							Genre: false,
							PublisherName: false,
						});
						setSearchUrl("");
						setSearchValue("");
					}}
				>
					Clear All Filters
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
