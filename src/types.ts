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
