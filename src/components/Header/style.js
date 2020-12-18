import { css, keyframes } from "@emotion/react";

const bounce = keyframes`
    from, 20%, 53%, 80%, to {
        transform: translate3d(0,0,0);
    }

    40%, 43% {
        transform: translate3d(0, -30px, 0);
    }

    70% {
        transform: translate3d(0, -15px, 0);
    }

    90% {
        transform: translate3d(0,-4px,0);
    }
`


const Styles = {
    main: css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `,
    root: css`
        background: none;
        font-family: 'Nunito';
    `,

    overlay: css`
       width: 36px;
       height: 36px;
       border-radius: 50%;
       margin-top: 12px;
       margin-left: 12px;
    
    `,

    pokedexCount: css`
        animation: ${bounce} 1s ease;
        animation-iteration-count: 2;
        position: absolute;
        color: white;
    `,

    icon: css`
        color: #fff;
        font-size: 2rem;
    `,

    title: css`
        flex-grow: 1;
    `,

    titleColor: css`
        color: #FD297B;
    `,

    contentContainer: css`
        width: 90%;
        margin: 0 auto;
    `,

}

export default Styles