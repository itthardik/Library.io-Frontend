import NavBar from "./components/NavBar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Book from "./pages/Book";
import BookById from "./pages/BookById";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => (
	<div className="d-flex flex-md-row flex-column">
		<NavBar />
		<Outlet />
		<ToastContainer
			position="top-center"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
			transition={Flip}
		/>
	</div>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage error={null} />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/books",
				element: <Book />,
			},

			{
				path: "/books/:id",
				element: <BookById />,
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
