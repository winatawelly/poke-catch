import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons ($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
      count
      results {
          name
          image
      }
    }
  }
`

export const GET_POKEMON_DETAIL = gql`
  query pokemon ($name: String!) {
    pokemon(name: $name) {
      name
      abilities {
        ability {
          name
        }
      }
      sprites {
        back_default
        back_shiny
        front_default
        front_shiny
      }
      stats {
        base_stat
        stat {
          name
        }
      }
    }
  }
`