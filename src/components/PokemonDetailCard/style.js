import { css } from "@emotion/react";

const Styles = {
    root: css`
        max-width: 345px;
    `,

    imageContainer: css`
        display: flex;
        justify-content: center;
    `,

    image: css`
        min-width: 250px
    `,

    title: css`
        text-transform: capitalize;
        text-align: center;
    `,

    ability: css`
        margin-right: 2px;
        text-transform: capitalize;
    `,

    table: css`
        width: 235px;
    `,

    mt8: css`
        margin-top: 8px;
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

    actionButtonContainer: css `
        margin-left: 16px;
        margin-right: 16px;
        margin-bottom: 16px;
    `,

    actionButton: css`
        width: 100%;
    `, 

}

export default Styles