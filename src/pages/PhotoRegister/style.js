import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    width: 100%;
    height: 90%;
    color: white;
`;

export const title = css`
    cursor: default;
`;

export const imgLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 10px 0px;

    border: 1px solid #dbdbdb;
    border-radius: 30px;
    width: 200px;
    height: 200px;
    overflow: hidden;

    & > img {
        width: 100%;
    }
`;
