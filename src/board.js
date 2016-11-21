import { reduce, shuffle } from 'lodash'

export class Tile {
  constructor(type, chit) {
    this.type = type
    this.chit = chit
    this.neighbors = []
    this.harbors = []
  }
}

export default class Board {
  constructor() {
    this.generate()
  }

  generate() {
    // shuffle chits and create distribution function
    let chits = shuffle(Board.CHITS)
    let nextChit = (type) => type == 'desert' ? 7 : chits.shift()

    // build an array of tiles with randomized chits
    let tiles = reduce(Board.TILE_TYPES, (tiles, count, type) => {
      return tiles.concat(Array(count).fill(null).map(() =>
        new Tile(type, nextChit(type))
      ))
    }, [])

    // shuffle tiles
    this.tiles = shuffle(tiles)
  }
}

Board.RESOURCE_TYPES = ['clay', 'desert', 'grain', 'ore', 'wood', 'wool']
Board.TILE_TYPES = { clay: 3, desert: 1, grain: 4, ore: 3, wood: 4, wool: 4 }
Board.CHITS = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]
