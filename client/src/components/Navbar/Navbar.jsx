import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='flex flex-row items-center gap-8 text-black font-customFont text-xl'>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Services</a>
        <a href="">Testimonials</a>
        <a href="">Contact</a>
    </nav>
  )
}

export default Navbar