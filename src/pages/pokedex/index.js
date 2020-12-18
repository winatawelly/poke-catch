/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react'

import { useContext } from 'react'
import { useHistory } from "react-router-dom";


import { PokedexContext } from '../../contexts/pokedex'

import { CssBaseline } from '@material-ui/core'
import Button from '@material-ui/core/Button';


import OverlayComponent from '../../components/overlay'
import HeaderComponent from '../../components/Header'
import PokemonCardComponent from '../../components/PokemonCard'


import Styles from './style'

const PokedexPage = () => {
    const history = useHistory();
    const { pokedex } = useContext(PokedexContext)  

    const onNavigateToPlay = () => {
        history.push('/play')
    }

    const cardRenderer = ({name, image, nickname}) => {
        return (
            <PokemonCardComponent
                type={'pokedex'}
                key={name}
                name={name}
                nickname={nickname}
                image={image}
                action={'release'}
            />
        )
    }

    const cardsRenderer = () => {
        return (
            <div
                css={Styles.cardContainer}
            >
                {pokedex.map(cardRenderer)}
            </div>
        )
        
    }

    const errorRenderer = (err) => {
        return (
            <div
                css={Styles.errorContainer}
            >
                <h2 css={Styles.errorText}>
                    You dont have any pokemon yet
                </h2>
                <Button
                    variant="contained" 
                    color="primary"
                    css={Styles.button}
                    onClick={ onNavigateToPlay }
                >
                    Play!
                </Button>
            </div>

        )
    }
    
    return (
        <div
            css={Styles.root}
        >
            <CssBaseline/>
            <OverlayComponent/>

            <HeaderComponent
                title={'Dex'}
            />
            {
                pokedex.length > 0
                    ? cardsRenderer()
                    : errorRenderer()
            }
            {/* {   error
                ? errorRenderer(error)
                : loading
                    ? loadingRenderer()
                    : cardsRenderer()
            } */}

        </div>
    )
}

export default PokedexPage
