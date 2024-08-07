import React from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { BookSchema } from "../types";

const Table = ({
	currPage,
	setCurrPage,
	maxPages,
	data,
}: {
	currPage: number;
	setCurrPage: React.Dispatch<React.SetStateAction<number>>;
	maxPages: number;
	data: BookSchema[];
}) => {
	return (
		<div className="">
			<div className="table-responsive px-3 border">
				<table className="table table-striped">
					<thead className="thead-dark">
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Author</th>
							<th>Publisher</th>
							<th>Link</th>
						</tr>
					</thead>
					<tbody>
						{data.map((d: BookSchema) => (
							<tr key={d.id}>
								<td>{d.id}</td>
								<td>{d.title}</td>
								<td>{d.authorName}</td>
								<td>{d.publisherName}</td>
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
