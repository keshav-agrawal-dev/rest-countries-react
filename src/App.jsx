import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Error from './components/Error'
import CountryDetails from './components/CountryDetails'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/country/:name' element={<CountryDetails />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}
