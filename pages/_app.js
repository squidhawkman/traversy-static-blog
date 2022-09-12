import '../styles/globals.css'
import Header from '../components/Header'

//this wraps around all of our page components (is this not the Layout?)

function MyApp({ Component, pageProps }) {
  return (
    <>
  <Header />
  <main className='container'>
  <Component {...pageProps} />
  </main>
  </>
  )
}

export default MyApp
