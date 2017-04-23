import { getInventory } from '../../lib/http'

export const openInventory = () => ({
  type: 'OPEN_INVENTORY',
  inventory: getInventory()
})