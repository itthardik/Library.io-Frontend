import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BookSchema } from "../types";
import { MdDelete } from "react-icons/md";
import UpdateBookButton from "../components/UpdateBookButton";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const BookById = () => {
	const bookId = useParams().id;
	const [book, setBook] = useState<BookSchema | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const response = await fetch(
					`https://localhost:7013/api/books/${bookId}`
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
				setBook(result.data);
				setLoading(false);
			} catch (error: any) {
				setError(error.message);
				setLoading(false);
			}
		};

		fetchBook();
	}, [bookId]);

	if (loading) {
		return (
			<div className="spinner-border text-primary">
				<span className="visually-hidden">Loading...</span>
			</div>
		);
	}

	if (error) {
		return <div className="alert alert-danger">Error: {error}</div>;
	}

	const DeleteBook = async (id: string) => {
		try {
			const response = await fetch(
				`https://localhost:7013/api/books/${bookId}`,
				{
					method: "DELETE",
					headers: {
						Accept: "*/*",
					},
				}
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
			toast.success("Book Deleted Successfully");
			setBook(null);
			navigate("/books");
		} catch (error: any) {
			toast.error(`Error: ${error.message}`);
		}
	};

	return (
		book && (
			<div className="mt-5 d-flex flex-column w-100 h-100 position-relative">
				<div
					className="position-absolute z-3"
					style={{
						fontSize: "60px",
						top: 0,
						left: 25,
						cursor: "pointer",
						color: "#17206D",
					}}
					onClick={() => {
						navigate("/books");
					}}
				>
					<IoArrowBackCircleSharp />
				</div>
				<div className="d-flex justify-content-evenly align-items-center w-100 h-75">
					<div className="book-cover w-50">
						<div className="edition">EDITION 2024</div>
						<div className="author-name">{book.authorName}</div>
						<div className="book-title">{book.title}</div>
						<div className="tagline">{book.description.slice(0, 10)}</div>
						<div className="slogan">{book.genre}</div>
						<div className="lorem-ipsum">{book.publisherName}</div>
						<div className="site-amet">₹{book.price}</div>
					</div>
					<div className="d-flex flex-column justify-content-center align-items-center w-50">
						<h2 className="">{book.title}</h2>
						<p className="">
							<strong>Description:</strong> {book.description}
						</p>
						<p className="">
							<strong>Author Name:</strong> {book.authorName}
						</p>
						<p className="">
							<strong>Genre:</strong> {book.genre}
						</p>
						<p className="">
							<strong>Publisher Name:</strong> {book.publisherName}
						</p>
						<p className="">
							<strong>Publisher Description:</strong>{" "}
							{book.publisherDescription}
						</p>
						<p className="">
							<strong>Price:</strong> ₹{book.price}
						</p>
						<p className="">
							<strong>Current Stock:</strong> {book.currentStock}
						</p>
						<p className="">
							<strong>Created At:</strong>{" "}
							{new Date(book.createdAt).toLocaleString()}
						</p>
					</div>
				</div>
				<div className="h-25 w-100 d-flex justify-content-evenly align-items-center">
					<div
						className="fs-4 fw-medium px-3 py-2 d-flex align-items-center gap-2"
						style={{
							backgroundColor: "red",
							color: "white",
							borderRadius: 15,
							cursor: "pointer",
						}}
						onClick={() => {
							DeleteBook(bookId ?? "");
						}}
					>
						<MdDelete className="fs-2" />
						<div className="pb-1">Delete Book</div>
					</div>
					<UpdateBookButton
						bookData={book}
						bookId={bookId ?? ""}
						setBook={setBook}
					/>
				</div>
			</div>
		)
	);
};

export default BookById;
