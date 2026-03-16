import '../App.css'
import Header from './Header'

export default function Error() {
  return (
    <>
      <Header />
      <code
        style={{
          textAlign: 'center',
          display: 'block',
          color: 'red',
          marginTop: '16px',
        }}
      >
        Country Not Found
      </code>
    </>
  )
}
