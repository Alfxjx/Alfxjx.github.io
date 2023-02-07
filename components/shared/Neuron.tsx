import { useRef, useEffect, useState, useCallback } from "react";
import { useMeasurableRef } from "./useMeasurableRef";

const TP = 2 * Math.PI;
const CSIZE = 400;

let t = 0;
let inc = 3;

let stopped = true;

let curves: any[] = [];

let eg = Math.random() < 0.3;

const getRandomInt = (min: number, max: number, low?: boolean) => {
	if (low) return Math.floor(Math.random() * Math.random() * (max - min)) + min;
	else return Math.floor(Math.random() * (max - min)) + min;
};

class Circle {
	ctx!: any;
	x!: any;
	y!: any;
	xp!: any;
	yp!: any;
	radius!: any;
	pc!: any;

	c: any[] = [];

	constructor(ctx: any, x: any, y: any, xp: any, yp: any, radius: any, pc: any) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.xp = xp;
		this.yp = yp;
		this.radius = radius;
		this.pc = pc;
	}

	drawCircle(rf: any, hue: any) {
		const ctx = this.ctx;
		ctx.beginPath();
		ctx.moveTo(this.x + this.radius * rf, this.y);
		ctx.arc(this.x, this.y, this.radius * rf, 0, TP);
		ctx.fillStyle = "hsl(" + (hue + 5 * this.radius) + ",90%,50%)";
		ctx.fill();
	}
}

var ca = [new Circle(0, 0, 0, 0, 50, 0, 0)];

class Curve {
	len = 0;
	path: any;
	car: any[] = [];
	to = -getRandomInt(0, 400);
	ctx: any;
	constructor(ctx: any) {
		this.ctx = ctx;
	}

	addCurveCircle(cir: any) {
		if (cir.pc) {
			this.car.unshift(cir.pc);
			this.addCurveCircle(cir.pc);
		} else {
			return;
		}
	}

	setPath() {
		this.len = 0;
		this.path = new Path2D();
		this.path.moveTo(0, 0);
		this.path.lineTo(this.car[1].xp, this.car[1].yp);
		this.len += this.car[0].radius;
		for (let i = 1; i < this.car.length - 1; i++) {
			this.path.bezierCurveTo(
				this.car[i].x,
				this.car[i].y,
				this.car[i].x,
				this.car[i].y,
				this.car[i + 1].xp,
				this.car[i + 1].yp
			);
			this.len += 2 * this.car[i].radius;
		}
		this.path.lineTo(this.car[this.car.length - 1].x, this.car[this.car.length - 1].y);
		this.len += this.car[this.car.length - 1].radius;
	}

	drawCurve(hue: any) {
		let tt = this.to + t;
		this.ctx.setLineDash([Math.max(1, tt), 4000]);
		this.ctx.stroke(this.path);
		if (tt > this.len + 40) {
			this.car[this.car.length - 1].drawCircle(0.8, hue);
			if (tt > this.len + 120) return false;
			else return true;
		} else if (tt > this.len) {
			let raf = (0.8 * (tt - this.len)) / 40;
			this.car[this.car.length - 1].drawCircle(raf, hue);
			return true;
		} else {
			return true;
		}
	}
}

var draw = (ctx: any, hue: any) => {
	ctx.clearRect(-CSIZE, -CSIZE, 2 * CSIZE, 2 * CSIZE);
	let grown = 0;
	for (let i = 0; i < curves.length; i++) {
		if (curves[i].drawCurve(hue)) grown++;
	}
	drawPoint(0, 0, "silver", ctx);
	return grown;
};

var drawPoint = (x: any, y: any, col: any, ctx: any) => {
	// diag
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, TP);
	ctx.closePath();
	if (col) ctx.fillStyle = col;
	else ctx.fillStyle = "red";
	ctx.fill();
};

var start = (ctx: any, hue: any) => {
	if (stopped) {
		stopped = false;
		requestAnimationFrame(() => {
			animate(ctx, hue);
		});
	} else {
		stopped = true;
	}
};

var cval = (x: any, y: any, rad: any) => {
	if (Math.pow(x * x + y * y, 0.5) > CSIZE - rad) return false;
	for (let i = 0; i < ca.length; i++) {
		let rt = rad + ca[i].radius;
		let xd = ca[i].x - x;
		let yd = ca[i].y - y;
		if (Math.abs(xd) > rt) continue;
		if (Math.abs(yd) > rt) continue;
		if (Math.pow(xd * xd + yd * yd, 0.5) + 1 < rt) {
			return false;
		}
	}
	return true;
};

var grow = (ctx: any, rad: any) => {
	let c = eg ? ca[ca.length - 1 - getRandomInt(0, ca.length, true)] : ca[getRandomInt(0, ca.length)];
	let a = TP * Math.random();
	let x = c.x + (c.radius + rad) * Math.cos(a);
	let y = c.y + (c.radius + rad) * Math.sin(a);
	if (cval(x, y, rad)) {
		let xp = c.x + c.radius * Math.cos(a);
		let yp = c.y + c.radius * Math.sin(a);
		let circle = new Circle(ctx, x, y, xp, yp, rad, c);
		c.c.push(circle);
		ca.push(circle);
		return true;
	}
	return false;
};

var setCircles = (ctx: any) => {
	ca = [new Circle(0, 0, 0, 0, 50, 0, 0)];
	for (let i = 0; i < 2000; i++) {
		let r = 10;
		if (i < 20) r = 42;
		else if (i < 100) r = 34;
		else if (i < 300) r = 26;
		else if (i < 1000) r = 18;
		grow(ctx, r);
	}
	curves = [];
	for (let i = 0; i < ca.length; i++) {
		if (ca[i].c.length == 0) {
			var nc = new Curve(ctx);
			nc.car = [ca[i]];
			nc.addCurveCircle(ca[i]);
			nc.setPath();
			curves.push(nc);
		}
	}
};

var animate = (ctx: any, hue: any) => {
	if (stopped) return;
	t += inc;
	if (!draw(ctx, hue) || t < 0) {
		if (inc == 3) inc = -8;
		else {
			ctx.strokeStyle = "hsla(" + getRandomInt(0, 360) + ",90%,60%,0.6)";
			inc = 3;
			t = 0;
			eg = Math.random() < 0.3;
			setCircles(ctx);
		}
	}
	requestAnimationFrame(() => {
		animate(ctx, hue);
	});
};

export function Neuron() {
	const bodyRef = useRef(null);
	// const [canvasRef, setReadyState] = useState<HTMLCanvasElement | null>(null);
	// const canvasRefCb = useCallback((node: HTMLCanvasElement | null) => {
	// 	if (node !== null) {
	// 		setReadyState(node);
	// 	}
	// }, []);
	const [canvasRef, canvasRefCb] = useMeasurableRef();
	const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
	let hue = getRandomInt(0, 360);

	useEffect(() => {
		const handleResize = () => {
			let D = Math.min(window.innerWidth, window.innerHeight) - 40;
			if (canvasRef) {
				canvasCtxRef.current = canvasRef.getContext("2d");
				let ctx = canvasCtxRef.current!;
				ctx.canvas.style.width = D + "px";
				ctx.canvas.style.height = D + "px";
			}
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	const handleStart = () => {
		let ctx = canvasCtxRef.current!;
		start(ctx, hue);
	};

	useEffect(() => {
		if (canvasRef) {
			canvasCtxRef.current = canvasRef.getContext("2d");
			let ctx = canvasCtxRef.current;
			if (ctx) {
				ctx.translate(CSIZE, CSIZE);
				ctx.lineCap = "round";
				start(ctx, hue);
			}
		}
	}, [hue, canvasRef]);

	return (
		<div ref={bodyRef} className="text-center">
			<canvas ref={canvasRefCb} width={2 * CSIZE} height={2 * CSIZE} onClick={handleStart}></canvas>
		</div>
	);
}

export const SimpleCanvasExample: React.FC<{}> = () => {
	let canvasRef = useRef<HTMLCanvasElement | null>(null);
	let canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		// Initialize
		if (canvasRef.current) {
			canvasCtxRef.current = canvasRef.current.getContext("2d");
			let ctx = canvasCtxRef.current;
			ctx!.beginPath();
			ctx!.arc(95, 50, 40, 0, 2 * Math.PI);
			ctx!.stroke();
		}
	}, []);

	return <canvas ref={canvasRef}></canvas>;
};
