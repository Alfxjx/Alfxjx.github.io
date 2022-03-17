import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Header } from "../Header/index";
import { Footer } from "../Footer/index";
import { MyContext } from "../../pages/_app";
import { Switch } from "../Button/switch";

const BaseLayout = ({ title, children }) => {
	const { themeToggler, getNowTheme } = useContext(MyContext);
	const [NowTheme, setNowTheme] = useState("");
	useEffect(() => {
		const theme = getNowTheme();
		if (theme === "light") {
			setNowTheme("L");
		} else {
			setNowTheme("D");
		}
	}, [getNowTheme()]);
	useEffect(() => {
		document.title = title;
	}, [title]);
	return (
		<LayoutWrapper>
			<Header></Header>
			<div className="btn-wrapper">
				<Switch
					initalValue={NowTheme === "L"}
					onChange={() => themeToggler()}
				/>
			</div>
			<div className="main">{children}</div>
			<div className="footer-wrapper">
				<Footer showLink={true} />
			</div>
		</LayoutWrapper>
	);
};

const LayoutWrapper = styled.div`
	position: relative;
	width: 100%;
	min-height: 100vh;
	background: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	display: flex;
	flex-direction: column;
	.btn-wrapper {
		position: fixed;
		right: 1rem;
		top: 0.5rem;
		z-index: 100;
		button {
			margin: 0 2px;
		}
	}
	.main {
		flex: 1;
		margin: 0 4rem;
		@media (max-width: 600px) {
			margin: 0 10px;
		}
	}
	.footer-wrapper {
		flex: 0;
		display: flex;
		justify-content: center;
		padding: 0.25rem 0;
	}
`;

export { BaseLayout };
