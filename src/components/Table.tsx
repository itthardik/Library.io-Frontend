import React from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const Table = ({
	currPage,
	setCurrPage,
	maxPages,
	data,
	tableContents,
}: {
	currPage: number;
	setCurrPage: React.Dispatch<React.SetStateAction<number>>;
	maxPages: number;
	data: any[];
	tableContents: string[];
}) => {
	function camelToPascalWithSpaces(camelCaseString: string) {
		const pascalCaseString =
			camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);

		const spacedString = pascalCaseString.replace(/([A-Z])/g, " $1").trim();

		return spacedString;
	}
	return (
		<div className="">
			<div className="table-responsive px-3 border">
				<table className="table table-striped">
					<thead className="thead-dark">
						<tr>
							<th>ID</th>
							{tableContents.map((i: any) => (
								<th>{camelToPascalWithSpaces(i)}</th>
							))}
							<th>Link</th>
						</tr>
					</thead>
					<tbody>
						{data.map((d: any) => (
							<tr key={d.id}>
								<td>{d.id}</td>
								{tableContents.map((i: string) => (
									<td>{d[i]}</td>
								))}
								<td>
									<Link to={`./${d.id}`}>View</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="d-flex justify-content-between p-3 fw-medium">
				<div
					className={
						"d-flex align-items-center gap-2 " + (currPage <= 1 && "text-muted")
					}
					style={{ cursor: "pointer", color: "#17206D" }}
					onClick={() => {
						if (currPage > 1) setCurrPage(currPage - 1);
					}}
				>
					<GrLinkPrevious />
					Previous
				</div>

				<div>
					{currPage} / {maxPages}
				</div>

				<div
					className={
						"d-flex align-items-center gap-2 " +
						(currPage >= maxPages && "text-muted")
					}
					style={{ cursor: "pointer", color: "#17206D" }}
					onClick={() => {
						if (currPage < maxPages) setCurrPage(currPage + 1);
					}}
				>
					Next
					<GrLinkNext />
				</div>
			</div>
		</div>
	);
};

export default Table;
