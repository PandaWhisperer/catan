import { assert } from 'chai'
import { each } from 'lodash'
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
        assert.equal(count, tilesOfType.length)
      })
    })
  })
})
