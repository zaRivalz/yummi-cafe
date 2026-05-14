export type MenuPrice = number | { tall: number; serious: number }

export interface MenuItem {
  name: string
  description?: string
  price?: MenuPrice
}

export interface MenuCategory {
  id: string
  label: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'coffee',
    label: 'Coffee',
    items: [
      { name: 'Cortado', price: 30 },
      { name: 'Flat White', price: 30 },
      { name: 'Americano', price: { tall: 25, serious: 30 } },
      { name: 'Cappuccino / Red', price: { tall: 30, serious: 35 } },
      { name: 'Caffè / Caramel Latte', price: { tall: 30, serious: 35 } },
      { name: 'Chai / Dirty Chai Latte', price: { tall: 30, serious: 35 } },
      { name: 'Hot Chocolate', price: { tall: 35, serious: 40 } },
      { name: 'Light / Vegan Hot Chocolate', price: { tall: 35, serious: 40 } },
      { name: 'Matcha Latte', price: 40 },
      { name: 'Iced Latte / Chai Latte', price: { tall: 40, serious: 45 } },
    ],
  },
  {
    id: 'serious-drinks',
    label: 'Serious Drinks',
    items: [
      { name: 'Dragon Fruit Delight', description: 'Dragon Fruit, Banana, Raspberries & Almond Milk', price: 60 },
      { name: 'Banana & Strawberry Shake', description: 'Strawberries, Banana, Peach, Orange Juice & Flakes', price: 60 },
      { name: 'Blueberry & Lemonade Slushie', description: 'Frozen Lemon Juice & Lemonade', price: 60 },
      { name: 'Collagen Fruit Delight', description: 'Mango, Banana, Strawberries, Collagen Powder & Almond Milk', price: 40 },
      { name: 'Cherry Kisses', description: 'Cherry, Strawberry, Banana, Yogurt, Almond Milk', price: 40 },
      { name: 'Muscle Builder Protein Shake', description: 'Coconut Milk & Chia Seeds', price: 50 },
      { name: 'Endurance Energy Booster', description: 'Mango, Pineapple, Cinnamon Extract', price: 40 },
      { name: 'Green Performance Shake', description: 'Celery, Apple, Cucumber, Lemon & Ginger Extract', price: 40 },
      { name: 'Power Breakfast Bowl', description: 'Mixed Berries, Bananas, Quinoa Seeds & Nut Butter', price: 60 },
    ],
  },
  {
    id: 'toast',
    label: 'Toast',
    items: [
      { name: 'Toasted Ham, Cheese & Tomato', price: 30 },
      { name: 'Toasted Bacon & Eggs', price: 35 },
      { name: 'Toasted Mince & Cheese', price: 35 },
      { name: 'Toasted Steak, Cheese & Onion', price: 45 },
      { name: 'Yummi Toast', price: 45 },
      { name: 'Scrambled Eggs & Cheese', price: 30 },
      { name: 'Scrambled Egg, Tomato & Cucumber', price: 35 },
      { name: 'Avocado & Feta Cheese', price: 35 },
      { name: 'Chicken Mayo & Turkish Avo', price: 40 },
      { name: 'Tuna Mayo, Tomato & Mozzarella Cheese', price: 40 },
    ],
  },
  {
    id: 'jaffles',
    label: 'Jaffles',
    items: [
      { name: 'Chicken Jaffle', price: 35 },
      { name: 'Mince Jaffle', price: 35 },
      { name: 'Bacon & Eggs Jaffle', price: 40 },
    ],
  },
  {
    id: 'breakfast',
    label: 'Breakfast',
    items: [
      { name: 'Eggs on Toast', price: 60 },
      { name: 'French Toast', price: 35 },
      { name: 'Avo on Toast', price: 60 },
      { name: "Yummi's Special", price: 75 },
      { name: 'Mixed Breakfast' },
    ],
  },
  {
    id: 'burgers',
    label: 'Burgers',
    items: [
      { name: 'Chicken Fillet Burger & Cheese', price: 70 },
      { name: 'Steak Burger & Cheese', price: 100 },
      { name: 'Yummi Burger' },
    ],
  },
  {
    id: 'lunch',
    label: 'Lunch',
    items: [
      { name: 'Chicken Wrap', price: 70 },
      { name: 'Vegetarian Wrap' },
      { name: 'Chicken Schnitzel & Chips' },
      { name: 'Roland Special (PARRA)' },
    ],
  },
]
