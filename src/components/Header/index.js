/** @jsx jsx */
/** @jsxRuntime classic */
import { useContext, Fragment } from 'react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types'
import { PokedexContext } from '../../contexts/pokedex'

import { jsx } from '@emotion/react'

import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';

import OverlayComponent from '../overlay'

import SortIcon from '@material-ui/icons/Sort'
import PokeballIcon from '../../assets/icons/pokeball.svg'

import Styles from './style'

const HeaderComponent = (props) => {
    const history = useHistory();
    const { pokedex } = useContext(PokedexContext)
    const [state, setState] = useState({
        anchor: null,
    })

    const onMenuClicked = (event) => {
        setState({
            anchor: event.currentTarget,
        })
    }

    const onMenuClosed = (route) => {
        history.push(route);
        setState({
            anchor: null,
        })
    }

    const onIconClicked = () => {
        history.push("/pokedex");
    }

    const titleRenderer = () => {
        return (
            <h1
                onClick={onMenuClosed.bind(this, '/')}
                css={Styles.title}>
                Poké
                <span
                    css={Styles.titleColor}
                >
                    {props.title}
                </span>
                .
            </h1>
        )
    }

    const menuIconRenderer = () => {
        return (
            <IconButton
                onClick={onMenuClicked}
            >
                <SortIcon
                    css={Styles.icon}
                />
            </IconButton>
        )
    }

    const pokedexButtonRenderer = () => {
        return (
            <IconButton onClick={onIconClicked}>
                {
                    pokedex && pokedex.length > 0 &&
                    <Fragment>
                        <OverlayComponent
                            style={Styles.overlay}
                        />
                        <h5
                            css={Styles.pokedexCount}
                        >
                            {pokedex.length}
                        </h5>
                    </Fragment>
                }
                <Icon
                    fontSize={'large'}
                >
                    <img
                        src={PokeballIcon}
                        alt={'pokedex'}
                    />
                </Icon>
            </IconButton>
        )
    }

    const sideButtonRenderer = () => {
        return props.sideButton === 'menu'
            ? menuIconRenderer()
            : pokedexButtonRenderer()
    }

    const headerRenderer = () => {
        return (
            <Toolbar
                css={Styles.contentContainer}
            >
                {titleRenderer()}
                {sideButtonRenderer()}
            </Toolbar>
        )
    }

    const menuRenderer = () => {
        return (
            <Menu
                id="simple-menu"
                anchorEl={state.anchor}
                keepMounted
                open={Boolean(state.anchor)}
                onClose={onMenuClosed}
            >
                <MenuItem onClick={onMenuClosed.bind(this, '/play')}>Play</MenuItem>
                <MenuItem onClick={onMenuClosed.bind(this, '/pokedex')}>Pokédex</MenuItem>
            </Menu>
        )
    }

    return (
        <div
            css={Styles.main}
        >
            <AppBar
                css={[Styles.root, props.styles]}
                elevation={0}           >
                {headerRenderer()}
            </AppBar>
            {menuRenderer()}
        </div>
    )
}

HeaderComponent.defaultProps = {
    sideButton: 'menu',
    title: 'Catch'
}

HeaderComponent.propTypes = {
    sideButton: PropTypes.string,
    title: PropTypes.string,
    styles: PropTypes.object,
}
export default HeaderComponent


