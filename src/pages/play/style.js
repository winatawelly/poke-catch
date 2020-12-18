import { css } from "@emotion/react";

import bg from '../../assets/images/list-bg1.png'

const Styles = {
    root: css`
        background-image: url(${bg});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        background-attachment: fixed;

        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    `,

    cardContainer: css`
        margin-top: 120px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 80vw;
        // flex-shrink: 1;
        // max-width: 1000px;
        // height: 300px;
    `,

    errorContainer: css`
        display: flex;
        flex-direction: column;
    `,

    errorText: css`
        color: white;
        text-align: center;
        z-index: 1;
    `,

    iconContainer: css`
        display: flex;
        justify-content: center;
    `,

    icon: css`
        color: white;
        height: 64px;
        width: 64px;

    `

}

export default Styles