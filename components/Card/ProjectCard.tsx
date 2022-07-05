import React from "react";
import styled from "styled-components";
import { BiShare as Share } from "react-icons/bi";

export interface IProject {
  name: string;
  width: number;
  height: number;
  description: string;
  link: string;
  scale: number;
}

const ProjectCard = ({ options }: { options: IProject }) => {
  return (
    <ProjectCardWrapper scale={options.scale}>
      <a target="_blank" href={options.link} className="all">
        <div>
          <a target="_blank" href={options.link} className="name">
            <Share></Share>
            <span>{options.name.toUpperCase()}</span>
            {/* <img className="img" src={options.picture} alt="proj-pic" /> */}
          </a>
          <div className="description">{options.description}</div>
        </div>
      </a>
    </ProjectCardWrapper>
  );
};

const ProjectCardWrapper = styled.div<{ scale: number; top: number }>`
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Monaco", sans-serif;
  margin: 1rem;
  padding: 1.25rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background: ${({ theme }) => theme.backgroundLight};
  width: 25%;
  @media (max-width: 600px) {
    margin: 0.75rem auto;
    padding: 1rem;
    width: 80%;
  }
  &:hover {
    background: ${({ theme }) => theme.bgHover};
    .name {
      color: ${({ theme }) => theme.themeColor};
    }
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
  .name {
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    text-decoration: none;
    position: relative;
    span {
      margin-left: 10px;
    }
    @media (max-width: 800px) {
      font-size: 0.75rem;
    }
    &:hover {
    }
    .img {
      display: none;
      position: fixed;
      right: 2rem;
      top: 3rem;
      z-index: 10;
      transform-origin: left top;
      transform: ${({ scale }) => `scale(${scale})`};
      border: 1px solid ${({ theme }) => theme.themeColor};
      border-radius: ${({ theme }) => theme.borderRadius};
    }
    &:hover {
      .img {
        display: block;
      }
    }
  }
  .description {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25;
    @media (max-width: 800px) {
      font-size: 0.75rem;
    }
  }
`;

export { ProjectCard };
