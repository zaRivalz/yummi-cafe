export interface Review {
  id: string
  author: string
  rating: 5
  text: string
  date: string
}

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    text: 'Absolutely beautiful café! The floral decor is stunning and the food is delicious. The best breakfast spot in Stellenbosch.',
    date: 'April 2025',
  },
  {
    id: '2',
    author: 'James T.',
    rating: 5,
    text: 'The coffee is incredible and the atmosphere is so warm and welcoming. Staff are always friendly and the food is consistently good.',
    date: 'March 2025',
  },
  {
    id: '3',
    author: 'Lerato K.',
    rating: 5,
    text: 'Such a unique and charming spot. The Dragon Fruit Delight is a must-try! Will definitely be back.',
    date: 'February 2025',
  },
  {
    id: '4',
    author: 'Michael R.',
    rating: 5,
    text: "Yummi Café never disappoints. The murals are gorgeous, the menu is varied and the portions are generous. My go-to in Stellenbosch.",
    date: 'January 2025',
  },
]
