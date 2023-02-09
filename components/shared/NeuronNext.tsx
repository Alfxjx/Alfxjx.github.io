import { useRef, useEffect } from "react";
import { useMeasurableRef } from "./useMeasurableRef";

/**
 * 绘制一条曲线路径 https://juejin.cn/post/6844903544181506055
 * @param  {Object} ctx canvas渲染上下文
 * @param  {Array<number>} start 起点
 * @param  {Array<number>} end 终点
 * @param  {number} curveness 曲度(0-1)
 * @param  {number} percent 绘制百分比(0-100)
 */
function drawCurvePath(ctx: any, start: number[], end: number[], curveness: number, percent: number) {
	var cp = [
		(start[0] + end[0]) / 2 - (start[1] - end[1]) * curveness,
		(start[1] + end[1]) / 2 - (end[0] - start[0]) * curveness,
	];

	var t = percent / 100;

	var p0 = start;
	var p1 = cp;
	var p2 = end;

	var v01 = [p1[0] - p0[0], p1[1] - p0[1]]; // 向量<p0, p1>
	var v12 = [p2[0] - p1[0], p2[1] - p1[1]]; // 向量<p1, p2>

	var q0 = [p0[0] + v01[0] * t, p0[1] + v01[1] * t];
	var q1 = [p1[0] + v12[0] * t, p1[1] + v12[1] * t];

	var v = [q1[0] - q0[0], q1[1] - q0[1]]; // 向量<q0, q1>

	var b = [q0[0] + v[0] * t, q0[1] + v[1] * t];

	ctx.moveTo(p0[0], p0[1]);

	ctx.quadraticCurveTo(q0[0], q0[1], b[0], b[1]);
}

var percent = 0;
let stopId!: number;

function animate(ctx: CanvasRenderingContext2D, point: number[]) {
	// ctx.clearRect(0, 0, 800, 800);
	ctx.beginPath();

	const nextPoint = [point[0] + Math.random() * 5, point[1] + Math.random() * 5];

	drawCurvePath(ctx, point, nextPoint, 0.2, percent);

	ctx.stroke();

	percent = (percent + 1) % 100;

	if (percent >= 99) {
		cancelAnimationFrame(stopId);
	}

	stopId = requestAnimationFrame(() => {
		animate(ctx, nextPoint);
	});
}

export function NeuronNext() {
	const [canvasRef, canvasRefCb] = useMeasurableRef<HTMLCanvasElement>();
	const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		if (canvasRef) {
			canvasCtxRef.current = canvasRef.getContext("2d");
			let ctx = canvasCtxRef.current;
			if (ctx) {
				ctx.lineWidth = 2;
				ctx.strokeStyle = "#000";
				ctx.setLineDash([]);
				const startPoint = [0, 0];
				animate(ctx, startPoint);

				ctx.stroke();
			}
		}
	}, [canvasRef]);

	return <canvas width={150} ref={canvasRefCb}></canvas>;
}
