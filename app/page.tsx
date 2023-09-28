import Link from 'next/link'
const Home = () => {
  // There are three ways to access the session
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1> The home page now</h1>
      <Link className="bg-slate-500 p-2" href='/admin'> Go to Admin </Link>

    </div>
  )
}

export default Home;