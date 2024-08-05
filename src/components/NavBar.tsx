import React from "react";
import { FaBook } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { AiFillCarryOut } from "react-icons/ai";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<div
			className="vh-100"
			style={{ backgroundColor: "#eeeeee", minWidth: "20%" }}
		>
			<div className="py-4 d-flex flex-column justify-content-center align-items-end">
				{/* LOGO */}
				<Link
					className="d-flex justify-content-center align-items-center gap-4 w-100 text-decoration-none text-black"
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
				<div className="mt-5 w-75">
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
				<Link
					className="w-100 d-flex justify-content-center align-item-center gap-1 mt-5 text-decoration-none text-black fw-medium"
					style={{ cursor: "pointer" }}
					to="/help"
				>
					<IoMdHelpCircleOutline className="h4" />
					Help
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
