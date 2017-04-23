const defaultState = {
  open: false,
  titles: [],
  trophies: [],
  hats: []
}

export default ((state = defaultState, action) => {
  switch(action.type) {
    case 'OPEN_INVENTORY':
      const { available, titles, trophies, hats } = action.inventory

      if (!action.inventory.available) {
        return state
      }

      const updatedInventoryState = Object.assign({}, state, {
        open: available,
        titles,
        trophies,
        hats
      })

      return updatedInventoryState
    default:
      return state
  }
})
