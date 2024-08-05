import NavBar from "./components/NavBar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Layout = () => (
	<div className="d-flex min-vh-100">
		<NavBar />
		<Outlet />
	</div>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <div>Home</div>,
			},
			{
				path: "/books",
				element: <div>Books</div>,
			},
			{
				path: "/members",
				element: <div>Members</div>,
			},
			{
				path: "/borrowBook",
				element: <div>Borrow Book</div>,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
