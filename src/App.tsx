import './App.css'
import { Route, Routes } from 'react-router-dom'
import { DetailsPage, HomePage } from './pages'

function App() {

  return (
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/details' element={<DetailsPage/>}/>

  </Routes>
  )
}

export default App
