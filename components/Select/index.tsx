import React from "react";
import styled from "styled-components";

interface ISelect {
	defaultValue: string | number;
	optionList: { label: string; value: string | number }[];
	onSelect: (val: string) => void;
}

export function Select({ defaultValue, optionList, onSelect }: ISelect) {
	return (
		<SelectWrapper id="site" value={defaultValue} onChange={onSelect}>
			{optionList.map((x) => {
				return (
					<OptionWrapper key={x.value} value={x.value}>
						{x.label}
					</OptionWrapper>
				);
			})}
		</SelectWrapper>
	);
}

const SelectWrapper = styled.select`
	margin: 0 0.625rem;
	padding: 0.5rem 0 0.5rem 0.25rem;
	border: 1px solid ${({ theme }) => theme.themeColor};
	color: ${({ theme }) => theme.themeColor};
	background: ${({ theme }) => theme.background};
	border-radius: 0.25rem;
	&:focus {
		outline: none;
	}
`;
const OptionWrapper = styled.option`
	padding: 0.375rem 0.5rem;
`;
