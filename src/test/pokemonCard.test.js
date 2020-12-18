import React from "react";
import {mount} from 'enzyme'

import {PokedexContext} from '../contexts/pokedex'

import PokemonCardComponent from '../components/PokemonCard'

const pokedex = jest.fn()


it("show pokemon card" , async () => {
    const wrapper = mount(
        // eslint-disable-next-line react/jsx-pascal-case
        <PokedexContext.Provider value={{pokedex}}>
            <PokemonCardComponent
            name={'ditto'}
            image={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'}
            action={'catch'}
            type={'pokecards'}
            />
        </PokedexContext.Provider>
    )
});