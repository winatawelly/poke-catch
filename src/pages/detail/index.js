/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react'


import {useParams} from 'react-router-dom'

import { CssBaseline } from '@material-ui/core'

import HeaderComponent from '../../components/Header'
import PokemonDetailCardComponent from '../../components/PokemonDetailCard'

import Styles from './style'

const DetailPage = () => {
    const {pokemonName} = useParams()
    return(
        <div css={Styles.root}>
            <CssBaseline/>
            <HeaderComponent
                title={'mon'}
                sideButton={'pokedex'}
                styles={Styles.header}
            />
            <div css={Styles.main}>
                <PokemonDetailCardComponent
                    name={pokemonName}
                />
            </div>
        </div>
    )
}

export default DetailPage
