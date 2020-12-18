import { css } from "@emotion/react";

const Styles = {
    root: ``,

    title: css `
        text-align: center;
    `,

    pokeball: css`
        max-width: 300px;
    `,

    imageContainer: css`
        display: flex;
        justify-content: center;
    `,

    pokemonImage: css`
        min-width: 250px;
    `,

    resultContainer: css`
        width: 300px;
        min-height: 100px;
    `,

    resultTitle: css`
        text-transform: capitalize;
        font-family: 'Nunito';
        text-align: center;
        margin: 0;
        margin-top: 12px;
    `,

    resultDesc: css`
        text-transform: capitalize;
        font-family: 'Nunito';
        text-align: center;
        margin: 0;
    `,

    textFieldContainer: css`
        margin-top: 24px;
        padding-left: 24px;
        padding-right: 24px;
    `
}

export default Styles