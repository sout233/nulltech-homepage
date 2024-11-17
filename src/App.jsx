import { useState } from 'react'
import './App.css'
import Homepage from './Pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Homepage />
    </>
  )
}

export default App
