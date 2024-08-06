import NavBar from "./components/NavBar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./pages/Home";

const Layout = () => (
	<div className="d-flex flex-md-row flex-column vh-100">
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
				element: <Home />,
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
