export default function Search({ query }) {
  return (
    <>
      <div className="search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          onChange={(e) => query(e.target.value)}
          placeholder="Search for a country..."
        />
      </div>
    </>
  )
}
