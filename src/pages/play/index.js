/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react'

import { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client';

import { GET_POKEMONS } from '../../queries'


import { CssBaseline, IconButton } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


import OverlayComponent from '../../components/overlay'
import HeaderComponent from '../../components/Header'
import PokemonCardComponent from '../../components/PokemonCard'


import Styles from './style'

const PlayPage = () => {
    const [state, setState] = useState({
        limit: 27,
    })

    const { loading, error, data, refetch } = useQuery(GET_POKEMONS, {
        variables: {
            limit: state.limit,
        }
    });

    
    const onLoadMore = () => {
        setState({
            ...state,
            limit: state.limit + 27,
        })
        refetch()
    }

    const cardRenderer = ({name, image}) => {
        return (
            <PokemonCardComponent
                type={'pokecards'}
                key={name}
                name={name}
                image={image}
                action={'catch'}
            />
        )
    }

    const loadingRenderer = () => {
        return (
            <div>
                <CircularProgress color='secondary'/>
            </div>
        )
    }

    const cardsRenderer = () => {
        return (
            <div>
                <div
                    css={Styles.cardContainer}
                >
                    {data.pokemons.results.map(cardRenderer)}
                </div>
                <div css={Styles.iconContainer}>
                    <IconButton onClick={onLoadMore}>
                        <KeyboardArrowDownIcon css={Styles.icon}/>
                    </IconButton>
                </div>
            </div>
        )
        
    }

    const errorRenderer = (err) => {
        return (
            <div
                css={Styles.errorContainer}
            >
                <h2 css={Styles.errorText}>
                    Sorry we could not get data from pokeAPI<br/>please try again later :(
                </h2>
                <p css={Styles.errorText}>
                    see console (press f12) for error log
                </p>
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
                title={'Cards'}
                sideButton={'My Pokedex'}
            />
            {   error
                ? errorRenderer(error)
                : loading
                    ? loadingRenderer()
                    : cardsRenderer()
            }

        </div>
    )
}

export default PlayPage
