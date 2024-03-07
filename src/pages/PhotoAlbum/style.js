import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

export const imgLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 10px 0px;

    border: 1px solid #dbdbdb;
    border-radius: 30px;
    width: 400px;
    height: 400px;
    overflow: hidden;

    & > img {
        width: 100%;
    }
`;

export const h1Css = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
`;