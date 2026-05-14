import { menuCategories } from '@/data/menu'

describe('menuCategories', () => {
  it('has at least 7 categories', () => {
    expect(menuCategories.length).toBeGreaterThanOrEqual(7)
  })

  it('every category has an id, label, and items array', () => {
    for (const cat of menuCategories) {
      expect(cat.id).toBeTruthy()
      expect(cat.label).toBeTruthy()
      expect(Array.isArray(cat.items)).toBe(true)
      expect(cat.items.length).toBeGreaterThan(0)
    }
  })

  it('every item has a name', () => {
    for (const cat of menuCategories) {
      for (const item of cat.items) {
        expect(item.name).toBeTruthy()
      }
    }
  })

  it('coffee category contains Cortado', () => {
    const coffee = menuCategories.find((c) => c.id === 'coffee')
    expect(coffee).toBeDefined()
    expect(coffee!.items.some((i) => i.name === 'Cortado')).toBe(true)
  })
})
