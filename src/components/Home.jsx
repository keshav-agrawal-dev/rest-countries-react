import '../App.css'
import Header from './Header'
import Search from './Search'
import Filter from './Filter'
import CountriesContainer from './CountriesContainer'
import { useState } from 'react'

export default function Home() {
  const [search, setSearch] = useState('')

  return (
    <>
      <Header />

      <main>
        <div className="search-filter-container">
          <Search query={setSearch} />
          <Filter query={setSearch} />
        </div>

        <CountriesContainer searchQuery={search} />
      </main>
    </>
  )
}
