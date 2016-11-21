import { assert } from 'chai'
import { find, each, map, without } from 'lodash'
import Board from '../src/board'

describe('Board', function() {
  describe('new Board', function() {
    let board = new Board()

    it('creates a new board', function() {
      assert.isNotNull(board)
    })

    it('has 19 tiles', function() {
      assert.equal(board.tiles.length, 19)
    })

    it('has proper number of tiles of each type', function() {
      each(Board.TILE_TYPES, (count, type) => {
        let tilesOfType = board.tiles.filter((tile) => tile.type === type)
        assert.equal(tilesOfType.length, count)
      })
    })

    it('has a chit on each tile', function() {
      each(board.tiles, (tile) => assert.isNumber(tile.chit))
    })

    it('desert has chit 7', function() {
      let desert = find(board.tiles, ['type', 'desert'])
      assert.equal(desert.chit, 7)
    })

    it('other chits are distributed properly', function() {
      let chits = Array.from(Board.CHITS)
      each(board.tiles, ({chit}) => {
        let index = chits.indexOf(chit)
        if (index >= 0) chits.splice(index, 1)
      })
      assert.equal(chits.length, 0)
    })

    it('is randomized', function() {
      let chits = map(board.tiles, 'chit'),
          tiles = map(board.tiles, 'type'),
          otherBoard = new Board()

      assert.notDeepEqual(map(otherBoard.tiles, 'chit'), chits)
      assert.notDeepEqual(map(otherBoard.tiles, 'type'), tiles)
    })

    it('each tile has between 3 and 6 neighbors', function() {
      map(board.tiles, 'neighbors').forEach((n) =>
        assert.isAtLeast(n.length, 3) && assert.isAtMost(n.length, 6))
    })
  })
})
