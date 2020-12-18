/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react'

import PropTypes from 'prop-types'

import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";

import { GET_POKEMON_DETAIL } from '../../queries'



import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Chip from '@material-ui/core/Chip';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CircularProgress from '@material-ui/core/CircularProgress';

import CatchingModalComponent from '../../components/CatchingModal'

import Styles from './style'

const PokemonDetailCard = (props) => {
	const { data } = useQuery(GET_POKEMON_DETAIL, {
		variables: {
			name: props.name,
		}
	});
	const history = useHistory();
	const [state, setState] = useState({
		isError: false,
		isLoading: true,
		pokemon: {},
		isModalOpen: false,
	})

	if(data && data.pokemon.name !== null && state.isLoading) {
		setState({
			...state,
			pokemon: {
				...data.pokemon,
				sprites: Object.values(data.pokemon.sprites).filter(spr => spr !== 'Sprite'),
			},
			imageIndex: 0,
			isLoading: false,
		})
	}else if(data && data.pokemon.name === null && state.isLoading) {
		setTimeout(() => {
			history.push('/play')
		}, 3000);
		setState({
			isLoading: false,
			isError: true
		})
	}

	const onCatch = () => {
		setState({
			...state,
			isModalOpen: true,
		})
	}

	const onCloseModal = () => {
        setState({
            ...state,
            isModalOpen: false,
        })
    }

	const onPrevImage = () => {
		if(state.imageIndex !== 0) {
			setState({
				...state,
				imageIndex: state.imageIndex - 1
			})
		}
		
	}

	const onNextImage = () => {
		if(state.imageIndex !== state.pokemon.sprites.length-1) {
			setState({
				...state,
				imageIndex: state.imageIndex + 1
			})
		} 
	}

	const abilitiesRenderer = (ability) => {
		return (
			<Chip
				css={Styles.ability}
				key={ability.ability.name}
				label={ability.ability.name}
			/>
			
		)
	}

	const statsRenderer = () => {
		return (
			<TableContainer>
				<Table aria-label='simple table'>
					<TableHead>
					<TableRow>
						<TableCell align='left'>Stats</TableCell>
						<TableCell align='center'>Value</TableCell>
					</TableRow>
					</TableHead>
					{state.pokemon.stats.map(statsValueRenderer)}

				</Table>
			</TableContainer>
		)
	}

	const statsValueRenderer = (stats) => {
		return (
			<TableBody>
				<TableCell align={'left'}>
					{stats.stat.name}
				</TableCell>
				<TableCell align={'center'}>
					{stats.base_stat}
				</TableCell>
			</TableBody>
		)
	}

	const loadingRenderer = () => {
		return (
			<div>
				<CircularProgress color='secondary'/>
			</div>
		)
	}

	const errorRender =() => {
		return (
			<div
				css={Styles.errorContainer}
			>
				<h2 css={Styles.errorText}>
					{props.name} could not be found
				</h2>
				<p css={Styles.errorText}>
					you will be redirected to Play page in 3 seconds 
				</p>
			</div>
		)
	}

	const cardRenderer = () => {
		return (
			<div>

				<Card css={Styles.root}>
					<CardContent>
						<Typography gutterBottom variant="h4" component="h1" css={Styles.title}>
								{state.pokemon.name}
							</Typography>
						</CardContent>
					<div css={Styles.imageContainer}>
						<IconButton css={Styles.icon} onClick={onPrevImage}>
							<ArrowBackIcon/>
						</IconButton>
						<img
							src={state.pokemon.sprites[state.imageIndex]}
							alt={"pokemon"}
							css={Styles.image}
						/>
						<IconButton css={Styles.icon} onClick={onNextImage} >
							<ArrowForwardIcon/>
						</IconButton>
					</div>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Abilities
						</Typography>
						{state.pokemon.abilities.map(abilitiesRenderer)}
						<Typography gutterBottom variant="h5" component="h2" css={Styles.mt8}>
							Stats
						</Typography>
						{statsRenderer()}

					</CardContent>
					<div
						css={Styles.actionButtonContainer}
					>
						<Button
							variant={'outlined'}
							color={'secondary'}
							css={Styles.actionButton}
							onClick={onCatch}

						>
							Catch
						</Button>
					</div>
				</Card>
				<CatchingModalComponent
					open={state.isModalOpen}
					onClose={onCloseModal}
					pokemonName={state.pokemon.name}
					pokemonImage={state.pokemon.sprites[state.imageIndex]}
				/>
			</div>
		)
	}

	return (
		state.isError
			? errorRender()
			: state.isLoading
				? loadingRenderer()
				: cardRenderer()
		
  	)
}

PokemonDetailCard.propTypes = {
	name: PropTypes.string.isRequired,
}

export default PokemonDetailCard