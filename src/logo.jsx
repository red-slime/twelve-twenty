import React from "react";
import "./logo.css"; // import the CSS for styling
import logo from "./1220-Stacked-WHITE.png"; // import your logo image

const Logo = () => (
	<div className="logo-container">
		<img src={logo} alt="Logo" />
	</div>
);

export default Logo;
