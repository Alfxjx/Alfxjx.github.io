import React from "react";
import styled from "styled-components";

interface ISelect {
	defaultValue: string | number;
	optionList: { label: string; value: string | number }[];
	onSelect: (val: string) => void;
}

export function Select({ defaultValue, optionList, onSelect }: ISelect) {
	return (
		<SelectWrapper value={defaultValue} onChange={onSelect}>
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
	padding: 0.375rem 0.5rem;
	background: rgba(255, 255, 255, 0.3);
	border: none;
	border-radius: 0.25rem;
	&::focus {
		outline: none;
	}
`;
const OptionWrapper = styled.option`
	padding: 0.375rem 0.5rem;
`;
