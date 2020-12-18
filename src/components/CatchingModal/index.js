/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react'

import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { PokedexContext } from '../../contexts/pokedex'


import PokeballAnimation from '../../assets/images/pokeball-animation.gif'

import Styles from './style'

const CatchingModalComponent = (props) => {
	const { pokedex, updatePokedex } = useContext(PokedexContext)
	const [state, setState] = useState({
		isThrowing: true,
		isSuccess: undefined,
		nicknameError: false,
		nickname: '',
		errorMessage: '',
	})

	const onClose = () => {
		setState({
			...state,
			isThrowing: true,
			isSuccess: undefined,
			nicknameError: false,
			nickname: '',
			errorMessage: ''
		})
		props.onClose()

	};

	const onAddToPokedex = () => {
		if(state.nickname === '') {
			setState({
				...state,
				nicknameError: true,
				errorMessage: 'Nickname cannot be empty',
			})
		}else {
			if (!!pokedex.find(pokemon => pokemon.nickname === state.nickname)) {
				setState({
					...state,
					nicknameError: true,
					errorMessage: 'nickname already exist, please pick another',
				})
			} else {
				setState({
					...state,
					nicknameError: false,
				})
	
				updatePokedex({
					nickname: state.nickname,
					name: props.pokemonName,
					image: props.pokemonImage,
				})
	
				onClose()
			}

		}
	}

	useEffect(() => {
		if(props.open) {
			setTimeout(() => {
				setState({
					...state,
					isThrowing: false,
					isSuccess: Math.round(Math.random()) === 0
						? false 
						: true,
				})
			}, 2000);
		}
	}, [props.open])

	const onRetry = () => {
		setState({
			isThrowing: true,
			isSuccess: undefined,
		})

		setTimeout(() => {
			setState({
				...state,
				isThrowing: false,
				isSuccess: Math.round(Math.random()) === 0
					? false 
					: true,
			})
		}, 2000);
	}

	const onChangeText = (e) => {
		setState({
			...state,
			nickname: e.target.value
		})
	}

	const titleRenderer = () => {
		return (
			<DialogTitle
				id="form-dialog-title"
				css={Styles.title}
			>
				Throwing Pokeball
			</DialogTitle>
		)
	}

	const animationRenderer = () => {
		return (
			<div>
				{ titleRenderer() }
				<img
					css={Styles.pokeball}
					alt={'throwing pokeball'}
					src={PokeballAnimation}
				/>
			</div>
		)
	}

	const resultRenderer = () => {
		return (
			<div css={Styles.resultContainer}>
				{
					state.isSuccess
						? resultSuccessRenderer()
						: resultFailedRenderer()
				}
			</div>
		)
		// return state.isSuccess
		// 	? resultSuccessRenderer()
		// 	: resultFailedRenderer() 
	}

	const resultSuccessRenderer = () => {
		return (
			<div>
				<h2
					css={Styles.resultTitle}
				>
					{props.pokemonName} catched
				</h2>
				<div css={Styles.imageContainer}>
					<img
						css={Styles.pokemonImage}
						alt={props.pokemonName}
						src={props.pokemonImage}
					/>
				</div>
				<p css={Styles.resultDesc}>Add a nickname!</p>
				<div css={Styles.textFieldContainer}>
					<TextField
						error={state.nicknameError}
						helperText={state.errorMessage}
						onChange={onChangeText}
						autoFocus
						margin="dense"
						id="nickname"
						label="Nickname"
						type="text"
						fullWidth
					/>
				</div>
				<DialogActions>
					<Button onClick={onAddToPokedex} color="primary">
						Add to pokedex
					</Button>
				</DialogActions>
			</div>
		)
	}

	const resultFailedRenderer = () => {
		return (
			<div>
				<h2 css={Styles.resultTitle}>Oh no!</h2>
				<p css={Styles.resultDesc}>{props.pokemonName} ran away :(</p>
				<DialogActions>
					<Button onClick={onRetry} color="primary">
						try again
					</Button>
				</DialogActions>
			</div>
		)
	}

	return (
		<div>
			<Dialog
				open={props.open}
				onClose={onClose} 
				aria-labelledby="form-dialog-title"
			>
				{
					state.isThrowing
						? animationRenderer()
						: resultRenderer()
				}
				
				{/* <DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here. We will send updates
						occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
					/>
				</DialogContent> */}
			</Dialog>
		</div>
	);
				
}

CatchingModalComponent.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	pokemonName: PropTypes.string.isRequired,
	pokemonImage: PropTypes.string.isRequired,
}



export default CatchingModalComponent




