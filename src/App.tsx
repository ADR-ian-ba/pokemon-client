import './App.css'
import { Route, Routes } from 'react-router-dom'
import { DetailsPage, HomePage } from './pages'
import RevisedHome from './pages/RevisedHome'

function App() {

  return (
  <Routes>
    <Route path='/' element={<RevisedHome/>}/>
    <Route path='/details' element={<DetailsPage/>}/>

  </Routes>
  )
}

export default App
