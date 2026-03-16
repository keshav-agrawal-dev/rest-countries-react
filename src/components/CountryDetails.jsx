import { useEffect, useState } from 'react'
import '../index.css'
import Header from './Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CountryDetailsLoader from './CountryDetailsLoader'

export default function CountryDetails() {
  const [loading, setLoading] = useState(false)
  const [countryData, setCountryData] = useState(null)
  const [borderCountries, setBorderCountries] = useState([])
  const [error, setError] = useState(false)
  const { name } = useParams()

  useEffect(() => {
    setLoading(true)
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCountryData(data[0])
        } else {
          setError(true)
        }
        setLoading(false)
        setError(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [name])

  useEffect(() => {
    if (countryData && countryData.borders) {
      const codes = countryData.borders.join(',')

      fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`)
        .then((res) => res.json())
        .then((data) => {
          setBorderCountries(data)
        })
        .catch(() => setBorderCountries([]))
    }
  }, [countryData])

  const navigate = useNavigate()
  return (
    <>
      <Header />
      {loading && <CountryDetailsLoader />}
      {error && (
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
      )}
      {countryData && (
        <main>
          <span className="back-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>&nbsp;Back
          </span>
          <div className="country-details-container">
            <img
              className="country-flag-img"
              src={countryData.flags.svg}
              alt={countryData.name.common}
            />
            <div className="country-details">
              <h2 className="country-title">{countryData.name.common}</h2>
              <div>
                <p>
                  <b>Native Name: </b>
                  <span className="native-name">
                    {
                      Object.values(countryData.name.nativeName || {})[0]
                        ?.common
                    }
                  </span>
                </p>
                <p>
                  <b>Population: </b>
                  <span className="population">{countryData.population.toLocaleString()}</span>
                </p>
                <p>
                  <b>Region: </b>
                  <span className="region">{countryData.region}</span>
                </p>
                <p>
                  <b>Sub Region: </b>
                  <span className="sub-region">{countryData.subregion}</span>
                </p>
                <p>
                  <b>Capital: </b>
                  <span className="capital">
                    {countryData.capital?.join(', ')}
                  </span>
                </p>
                <p>
                  <b>Top Level Domain: </b>
                  <span className="tld">{countryData.tld}</span>
                </p>
                <p>
                  <b>Currencies: </b>
                  <span className="currencies">
                    {Object.values(countryData.currencies || {})
                      .map((currency) => currency.name)
                      .join(', ')}
                  </span>
                </p>
                <p>
                  <b>Languages: </b>
                  <span className="language">
                    {Object.values(countryData.languages || {}).join(', ')}
                  </span>
                </p>
              </div>
              <p className="border-countries">
                <b>Border Countries: </b>
                {borderCountries.length > 0 ? (
                  borderCountries.map((item) => (
                    <Link key={item.cca3} to={`/country/${item.name.common}`}>
                      {item.name.common}
                    </Link>
                  ))
                ) : (
                  <span>No Border Countries</span>
                )}
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  )
}
