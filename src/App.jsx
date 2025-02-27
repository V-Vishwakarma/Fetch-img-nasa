import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"


function App() {
  const [showModal, setShowModal] = useState(false)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`
      try {
        const res = await fetch(url)
        const apiData = await res.json()
        setData(apiData)
        console.log('DATA\n', apiData)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, [])



  function handleToggleModal() {
    setShowModal(!showModal)
  }


  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear" />
        </div>
      )}
      {showModal && (
        < SideBar data={data} handleToggleModal={handleToggleModal} />
      )}

      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />)}
    </>
  )
}

export default App
