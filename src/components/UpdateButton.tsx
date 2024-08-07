import { ChangeEvent, FormEvent, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { FormData, UpdateButtonProps } from "../types";

const UpdateButton = ({ bookData, bookId, setBook }: UpdateButtonProps) => {
	const [isPopUp, setIsPopUp] = useState(false);
	const [formData, setFormData] = useState<FormData>(bookData);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`https://localhost:7013/api/books/${bookId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						accept: "*/*",
					},
					body: JSON.stringify(formData),
				}
			);
			if (!response.ok) {
				throw new Error((await response.json()).title);
			} else {
				alert("Book Data Updated Successfully");
				setIsPopUp(false);
			}

			const result = await response.json();
			if (result.error) {
				alert(result.error);
			}
			setBook(result);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center py-3">
			<div
				className="fs-4 fw-medium px-3 py-2 d-flex align-items-center gap-2"
				style={{
					backgroundColor: "#17206D",
					color: "white",
					borderRadius: 15,
					cursor: "pointer",
				}}
				onClick={() => {
					setIsPopUp(true);
				}}
			>
				<RxUpdate className="fs-2" />
				<div className="pb-1">Update Book</div>
			</div>

			{isPopUp && (
				<div
					className="position-absolute z-3 d-flex justify-content-center align-items-center"
					style={{ top: 0, left: 0, width: "100%", height: "100%" }}
				>
					<div
						className="w-50"
						style={{
							backgroundColor: "white",
							border: "1px solid #17206D",
							boxShadow: "3px 3px 5px 2px",
							borderRadius: 15,
							height: "90%",
						}}
					>
						<div className="m-4 h-100">
							<div className="d-flex justify-content-between align-items-center my-3">
								<h2>Update Book</h2>
								<h1>
									<RiCloseCircleFill
										style={{ cursor: "pointer" }}
										onClick={() => {
											setIsPopUp(false);
										}}
									/>
								</h1>
							</div>
							<form
								onSubmit={handleSubmit}
								className="p-2"
								style={{ maxHeight: "80%", overflowY: "auto" }}
							>
								<div className="mb-3">
									<label htmlFor="title" className="form-label">
										Title
									</label>
									<input
										type="text"
										className="form-control"
										id="title"
										name="title"
										value={formData.title}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="description" className="form-label">
										Description
									</label>
									<input
										type="text"
										className="form-control"
										id="description"
										name="description"
										value={formData.description}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="authorName" className="form-label">
										Author Name
									</label>
									<input
										type="text"
										className="form-control"
										id="authorName"
										name="authorName"
										value={formData.authorName}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="genre" className="form-label">
										Genre
									</label>
									<input
										type="text"
										className="form-control"
										id="genre"
										name="genre"
										value={formData.genre}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="publisherName" className="form-label">
										Publisher Name
									</label>
									<input
										type="text"
										className="form-control"
										id="publisherName"
										name="publisherName"
										value={formData.publisherName}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="publisherDescription" className="form-label">
										Publisher Description
									</label>
									<input
										type="text"
										className="form-control"
										id="publisherDescription"
										name="publisherDescription"
										value={formData.publisherDescription}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="price" className="form-label">
										Price
									</label>
									<input
										type="number"
										className="form-control"
										id="price"
										name="price"
										value={formData.price}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="currentStock" className="form-label">
										Current Stock
									</label>
									<input
										type="number"
										className="form-control"
										id="currentStock"
										name="currentStock"
										value={formData.currentStock}
										onChange={handleChange}
										required
									/>
								</div>
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UpdateButton;
