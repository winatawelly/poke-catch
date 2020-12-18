import { css } from "@emotion/react";

import cardBg from '../../assets/images/card-bg.png'
import cardBg2 from '../../assets/images/card-bg-2.png'




const Styles = {

    overlay: css`
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 0;

    `,

    pokedexOverlay: css`
        background-color: rgba(0, 0, 0, 0.6);

    `,

    cardMedia: css `
        height: 140px;
        background-size: contain;
        z-index:
    `,

    card: css`
        z-index: 2;
        position: relative;
        background-color: #fff;
        background-image: url(${cardBg});
        width: 200px;
        height: 290px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        margin-left: 24px;
        margin-right: 24px;
        margin-top: 12px;
        margin-bottom: 12px;
    `,

    cardPokedex: css`
        background-image: url(${cardBg2});

    `,

    cardTitle: css`
        text-transform: capitalize;
        color: white;
        font-family: 'Nunito';
    `,

    cardButtonContainer: css`
        padding-left: 16px;
        padding-top: 12px;
    `,
}

export default Styles