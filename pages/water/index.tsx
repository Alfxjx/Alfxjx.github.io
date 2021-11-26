import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import { Button } from "@/components/Button";
import WaterLottie from "../../public/glass-water.json";

const WaterWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default function Water() {
	const [number, setNumber] = React.useState("0");
	const [target, setTarget] = React.useState("0");
	const [current, setCurrent] = React.useState("0");
	const [water, setWater] = React.useState(false);
	React.useEffect(() => {
		const temp = window.localStorage.getItem("target");
		setTarget(temp);
		setCurrent(temp);
	}, []);
	
	const targetSet = () => {
		window.localStorage.setItem("target", number);
		setTarget(number);
		setCurrent(number);
	};

  const drink = () => {
		setWater(true);
		setCurrent((Number(current) - 1).toString());
	};
	return (
		<WaterWrapper>
			<div className="targets">
				{target ? (
					<div>
						<div className="text">
							Drink {target}
							cups of water a day
						</div>
						<div>{current} left</div>
					</div>
				) : (
					<div>
						<input
							type="text"
							value={number}
							onChange={(e) => {
								setNumber(e.target.value);
							}}
						/>
						<Button onClick={targetSet}>set</Button>
					</div>
				)}
			</div>
			<div className="results">
				{water && (
					<Lottie
						options={{
							loop: false,
							autoplay: true,
							animationData: WaterLottie,
							rendererSettings: {
								preserveAspectRatio: " xMidYMid slice",
							},
						}}
						eventListeners={[
							{
								eventName: "complete",
								callback: () => setWater(false),
							},
						]}
						isClickToPauseDisabled={true}
						height={240}
						width={240}
					></Lottie>
				)}
			</div>
			{
        Number(current)>0?(
          <div className="handlers">
				<Button onClick={() => drink()}>Drink</Button>
			</div>
        ):(
          <div className="res">
            good! all water drunk!
          </div>
        )
      }
		</WaterWrapper>
	);
}
