import React, { useState, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";

import { PokedexContext } from './contexts/pokedex'


import HomePage from './pages/home'
import PlayPage from './pages/play'
import PokedexPage from './pages/pokedex'
import DetailPage from './pages/detail'


const AppMain = () => {
    const sessionPokedex = JSON.parse(window.sessionStorage.getItem('pokedex'))
    const [state, setState] = useState({
        pokedex: sessionPokedex ? sessionPokedex : []
    })

    useEffect(() => {
        window.sessionStorage.setItem('pokedex', JSON.stringify(state.pokedex))
    }, [state.pokedex])

    const updatePokedex = (pokemon) => {
        setState({
            ...state,
            pokedex: [...state.pokedex, pokemon]
        })
    } 

    const removeFromPokedex = (nickname) => {
        setState({
            ...state,
            pokedex: state.pokedex.filter(pokemon => pokemon.nickname !== nickname)
        })
    }

    return (
        <PokedexContext.Provider value={{pokedex: state.pokedex, updatePokedex, removeFromPokedex}}>
            <Route exact path="/" component={HomePage}/>
            <Switch>
                <Route exact path="/play" component={PlayPage}/>
                <Route exact path="/detail/:pokemonName" component={DetailPage}/>
                <Route exact path="/pokedex" component={PokedexPage}/>
            </Switch>
        </PokedexContext.Provider>
    )
}

export default AppMain
