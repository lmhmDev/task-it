const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-4 bg-primary w-full text-white h-[74px]">
            <p className="text-xl">Task It</p>
            <p className='w-fit text-right'>by <a href="https://www.lorenzohermoso.com/" className='font-semibold transition hover:text-violet-300' target='_blank'>Lorenzo Hermoso</a></p>
        </nav>
    )
}

export default Navbar
