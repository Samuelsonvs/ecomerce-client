import React from 'react';
import { css } from '@emotion/core';
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
    display: block;
    margin: 50px auto 0 auto;
    text-align: center;
    `;

export default function LoadingBox() {
    return (
        <div className="sweet-loading">
            <PulseLoader css={override} color={"#4338ca"} size={15} margin={7} />
        </div>
    );
}