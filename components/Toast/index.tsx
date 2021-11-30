import React from 'react';

import {
	ToastContainer,
	ToastContainerProps,
	toast as notify,
	Slide,
} from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.min.css';

export const WrappedToastContainer = ({
	className,
	...rest
}: ToastContainerProps & { className?: string }) => (
	<div className={className}>
		<ToastContainer {...rest} />
	</div>
);

export const StyledContainer = styled(WrappedToastContainer).attrs({
	// custom props
	closeButton: true,
	transition: Slide,
	position: 'top-center',
	hideProgressBar: true,
	pauseOnHover: true,
	autoClose: 2000,
})`
	.Toastify__toast-container {
	}
	.Toastify__close-button {
		display: flex;
		align-items: center;
		align-self: center;
	}
	.Toastify__toast {
		background: #2A409B;
		color: #fff;
		padding: 2px 8px;
		text-align: center;
		min-height: 42px;
	}
	.Toastify__toast--error {
		background: #e74c3c;
		color: #fff;
	}
	.Toastify__toast--warning {
		background: #f1c40f;
		color: #fff;
	}
	.Toastify__toast--success {
		background: #3c8b3e;
		color: #fff;
	}
	.Toastify__toast--default {
		background: #fff;
		color: #000;
	}
	.Toastify__toast-body {
	}
	.Toastify__progress-bar {
	}
`;

export const toast = (msg: string, options?: ToastContainerProps) =>
	notify(msg, options);

toast.default = (msg: string, options?: ToastContainerProps) =>
	notify(msg, options);

toast.info = (msg: string, options?: ToastContainerProps) =>
	notify.info(msg, options);

toast.success = (msg: string, options?: ToastContainerProps) =>
	notify.success(msg, options);

toast.warning = (msg: string, options?: ToastContainerProps) =>
	notify.warning(msg, options);

toast.error = (msg: string, options?: ToastContainerProps) =>
	notify.error(msg, options);

toast.dark = (msg: string, options?: ToastContainerProps) =>
	notify.dark(msg, options);
