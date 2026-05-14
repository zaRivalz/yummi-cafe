import { render, screen } from '@testing-library/react'
import Contact from '@/components/sections/Contact'

describe('Contact', () => {
  it('renders the street address', () => {
    render(<Contact />)
    expect(screen.getByText(/137 Distillery Rd/i)).toBeInTheDocument()
  })

  it('renders the phone number', () => {
    render(<Contact />)
    expect(screen.getByText(/083 275 1545/i)).toBeInTheDocument()
  })

  it('renders Saturday hours', () => {
    render(<Contact />)
    expect(screen.getByText(/8am/i)).toBeInTheDocument()
  })

  it('renders Sunday as Closed', () => {
    render(<Contact />)
    expect(screen.getByText(/closed/i)).toBeInTheDocument()
  })
})
