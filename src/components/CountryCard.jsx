import { Link } from 'react-router-dom'

export default function CountryCard({ countryData }) {
  return (
    <>
      <Link to={`/country/${countryData.name.common}`} className="country-card">
        <img src={countryData.flags.svg} alt={countryData.name.common} />
        <h3>{countryData.name.common}</h3>
        <p>
          <b>Population: </b>
          {countryData.population.toLocaleString('en-IN')}
        </p>
        <p>
          <b>Region: </b>
          {countryData.region}
        </p>
        <p>
          <b>Capital: </b>
          {countryData.capital?.[0] || "N/A"}
        </p>
      </Link>
    </>
  )
}
