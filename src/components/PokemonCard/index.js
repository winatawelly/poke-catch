/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react'

import {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'

import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { PokedexContext } from '../../contexts/pokedex'


import OverlayComponent from '../../components/overlay'
import CatchingModalComponent from '../../components/CatchingModal'

import Styles from './style'



function PokemonCardComponent(props) {
    const history = useHistory();
    const { pokedex, removeFromPokedex } = useContext(PokedexContext)
    const [state, setState] = useState({
        isModalOpen: false,
        isInPokedex: !!pokedex.find(pokemon => pokemon.name === props.name)
    })

    useEffect(() => {
        setState({
            ...state,
            isInPokedex: !!pokedex.find(pokemon => pokemon.name === props.name)
        })
        
    }, [pokedex])

    const onNavigateToPokemonDetail = () => {
        history.push(`/detail/${props.name}`)
    }

    const onCatch = () => {
        setState({
            ...state,
            isModalOpen: true,
        })
    }


    const onRelease = () => {
        removeFromPokedex(props.nickname)
    }

    const onCloseModal = () => {
        setState({
            ...state,
            isModalOpen: false,
        })
    }

    const actionButtonRenderer = () => {
        if(props.action === 'catch') {
           return ( 
            <Button
                onClick={onCatch}
                variant={'contained'}
                size={'small'}
                color={'secondary'}
            >
                Catch
            </Button> 
           )
        }else if(props.action === 'release') {
            return ( 
                <Button
                    onClick={onRelease}
                    variant={'contained'}
                    size={'small'}
                    color={'primary'}
                >
                    Release
                </Button> 
               )
        }
    }

    return (
        <div>
            <Card
                css={[Styles.card, state.isInPokedex && Styles.cardPokedex]}
            >
                <OverlayComponent
                    style={[Styles.overlay, state.isInPokedex && Styles.pokedexOverlay]}
                />   
                <CardActionArea
                    onClick={onNavigateToPokemonDetail}
                >
                    <CardMedia
                        css={Styles.cardMedia}
                        image={props.image}
                        title={props.name}
                    />
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="h2"
                            css={Styles.cardTitle}
                        >
                            {props.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary" 
                            component="p"
                            css={Styles.cardTitle}

                        >
                            { 
                                props.type === 'pokecards'
                                    ? `Pokedex: ${pokedex.filter(pokemon => pokemon.name === props.name).length}` 
                                    : props.nickname
                            }
                        </Typography>
                       
                    </CardContent>
                </CardActionArea>
                <CardActions css={Styles.cardButtonContainer}>
                    {actionButtonRenderer()}
                </CardActions>
            </Card>
            <CatchingModalComponent
                open={state.isModalOpen}
                onClose={onCloseModal}
                pokemonName={props.name}
                pokemonImage={props.image}
            />
        </div>

    )
}

PokemonCardComponent.propTypes = {
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string,
    image: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['pokedex', 'pokecards']),
}

export default PokemonCardComponent

