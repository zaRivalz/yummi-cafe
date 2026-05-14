import { render, screen } from '@testing-library/react'
import Reviews from '@/components/sections/Reviews'

describe('Reviews', () => {
  it('renders the section heading', () => {
    render(<Reviews />)
    expect(screen.getByText(/what people say/i)).toBeInTheDocument()
  })

  it('renders at least one 5-star review', () => {
    render(<Reviews />)
    const stars = screen.getAllByText('★★★★★')
    expect(stars.length).toBeGreaterThan(0)
  })

  it('renders a link to Google Maps', () => {
    render(<Reviews />)
    const link = screen.getByRole('link', { name: /see all reviews/i })
    expect(link).toHaveAttribute('href', expect.stringContaining('google.com/maps'))
  })
})
