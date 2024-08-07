export interface BookSchema {
	id: number;
	title: string;
	description: string;
	authorName: string;
	genre: string;
	publisherName: string;
	publisherDescription: string;
	price: number;
	currentStock: number;
	isDeleted: boolean;
	createdAt: string;
}
export interface FormData {
	title: string;
	description: string;
	authorName: string;
	genre: string;
	publisherName: string;
	publisherDescription: string;
	price: number | "";
	currentStock: number | "";
}
export interface UpdateButtonProps {
	bookData: FormData;
	bookId: string;
	setBook: React.Dispatch<React.SetStateAction<BookSchema | null>>;
}
