import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import Link from "next/link";

export const ArticleCard = ({ post }) => (
  <ArticleWrapper>
    <Link as={`/${post.type}/${post.slug}`} href={`/${post.type}/[slug]`}>
      <div className="card">
        <div className="row">
          <div className="type">{post.type}</div>
          <div className="post-title">{post.title}</div>
        </div>
        <div className="row">
          <div className="excerpt">{post.excerpt}</div>
        </div>
      </div>
    </Link>
  </ArticleWrapper>
);

const ArticleWrapper = styled.div`
  margin: 1rem 0;
  cursor: pointer;
  width: 75%;
  max-width: 720px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background: ${({ theme }) => theme.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  @media (max-width: 800px) {
    width: 90%;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-family: "Monaco", sans-serif;
    width: 100%;
    box-sizing: border-box;
    padding: 1.25rem;

    @media (max-width: 800px) {
      margin: 0.75rem auto;
      padding: 1rem;
      width: 100%;
    }
    &:hover {
      background: ${({ theme }) => theme.bgHover};
    }
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 6px 0;
  }
  .type {
    border-radius: 6px;
    background: ${({ theme }) => theme.themeColor};
    color: ${({ theme }) => theme.textReverse};
    padding: 2px 6px;
    margin: 0 5px 0 10px;
    font-family: consolas, sans-serif;
    width: 2rem;
    text-align: center;
  }
  .post-title {
    font-weight: 600;
    line-height: 1.5rem;
  }
  .excerpt {
    width: 100%;
    margin-top: 4px;
    color: ${({ theme }) => theme.textGray};
    line-height: 1.5rem;
  }
`;
