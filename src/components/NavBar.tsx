import { useState } from "react";
import { FaBook, FaUsers } from "react-icons/fa";
import { AiFillCarryOut } from "react-icons/ai";
import { IoMdHelpCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
	const [menu, setMenu] = useState(false);
	return (
		<>
			{/* desktop nav */}
			<div
				className={
					"z-3 d-md-block min-vh-100 col-lg-3 col-md-4 col-9 " +
					(menu ? "d-block position-absolute" : "d-none")
				}
				style={{ backgroundColor: "#eeeeee" }}
			>
				<div className="py-4 d-flex flex-column justify-content-center align-items-end h-100">
					{/* LOGO */}
					<Link
						className="d-flex justify-content-center align-items-center gap-4 w-100 text-decoration-none text-black h-25"
						style={{ cursor: "pointer" }}
						to="/"
					>
						<h1
							className="fw-bolder"
							style={{ WebkitTextStroke: "15px #17206D" }}
						>
							L
						</h1>
						<h3 className="fw-normal">Library.io</h3>
					</Link>

					{/* Nav Items */}
					<div className="my-5 w-75 h-50">
						<NavLink
							className={({ isActive }) =>
								isActive ? "nav-link-active" : "nav-link"
							}
							to="/books"
						>
							<FaBook className="h3" />
							Books
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? "nav-link-active" : "nav-link"
							}
							to="/members"
						>
							<FaUsers className="h3" />
							Members
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? "nav-link-active" : "nav-link"
							}
							to="/borrowBook"
						>
							<AiFillCarryOut className="h3" />
							Borrow Book
						</NavLink>
					</div>

					{/* Help */}
					<div className="h-25 w-100">
						<Link
							className="d-flex justify-content-center align-item-center gap-1 mt-5 text-decoration-none text-black fw-medium"
							style={{ cursor: "pointer" }}
							to="/help"
						>
							<IoMdHelpCircleOutline className="h4" />
							Help
						</Link>
						{menu && (
							<IoMdCloseCircleOutline
								className={"mt-5 w-100"}
								style={{ fontSize: "40px", color: "#17206d" }}
								onClick={() => {
									setMenu(!menu);
								}}
							/>
						)}
					</div>
				</div>
			</div>

			{/* mobile nav */}
			<div
				className={
					"z-3 sticky-top d-md-none min-vw-100 py-4 row " +
					(!menu ? "d-flex" : "d-none")
				}
				style={{ backgroundColor: "#eeeeee" }}
			>
				<GiHamburgerMenu
					className="col-2 my-0 mx-3"
					style={{ fontSize: "50px", color: "#17206d" }}
					onClick={() => {
						setMenu(!menu);
					}}
				/>
				{/* LOGO */}
				<Link
					className="col d-flex justify-content-center align-items-center gap-4 text-decoration-none text-black"
					style={{ cursor: "pointer" }}
					to="/"
				>
					<h1
						className="fw-bolder"
						style={{ WebkitTextStroke: "15px #17206D" }}
					>
						L
					</h1>
					<h3 className="fw-normal">Library.io</h3>
				</Link>
			</div>
		</>
	);
};

export default NavBar;
