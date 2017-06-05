/**
 * Created by Murphy on 2017/5/6.
 * 根级别的 action
 */
import * as types from './mutation-types'

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}
