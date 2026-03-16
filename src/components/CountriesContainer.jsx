import { useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import CountriesContainerLoader from './CountriesContainerLoader'

export default function CountriesContainer({ searchQuery }) {
  const [countriesData, setCountriesData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,borders',
    )
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data)
        setLoading(false)
        setError(false)
      })
      .catch(() => {
        setError(true)
      })
  }, [])

  const filteredData = countriesData.filter(
    (country) =>
      country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim()) ||
      country.region.includes(searchQuery),
  )

  if (error) {
    return (
      <code
        style={{
          textAlign: 'center',
          display: 'block',
          color: 'red',
          marginTop: '16px',
        }}
      >
        Something Went Wrong
      </code>
    )
  }
  return (
    <>
      {loading ? (
        <CountriesContainerLoader />
      ) : (
        <div className="countries-container">
          {filteredData.map((country) => (
            <CountryCard key={country.name.common} countryData={country} />
          ))}
        </div>
      )}
    </>
  )
}
