import { useRouteError } from "react-router";
import { Link } from "react-router-dom";
import errorImage from "./../error.gif";

export default function ErrorPage({ error }: { error: any }) {
	const errorByRouter: any = useRouteError();

	return (
		<div className="container text-center mt-5 d-flex justify-content-center align-items-center">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<img
						src={errorImage}
						alt="Error"
						className="img-fluid mb-4"
						style={{ maxWidth: "60%" }}
					/>
					<h1 className="display-1 text-danger">OOPS!</h1>
					<p className="lead">{error}</p>
					{errorByRouter && (
						<p>
							<i>{errorByRouter.statusText || errorByRouter.message}</i>
						</p>
					)}
					<Link to={"/"} className="btn btn-warning">
						Back to Home Page
					</Link>
				</div>
			</div>
		</div>
	);
}
