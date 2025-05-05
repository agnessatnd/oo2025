import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import ManageAthletes from './pages/ManageAthletes';
import ManageResults from './pages/ManageResults';
import Menu from './components/Menu'
import EditResult from './pages/EditResult';
import EditAthlete from './pages/EditAthlete';
import SingleAthlete from './pages/SingleAthlete';
import SingleResult from './pages/SingleResult';

function App() {

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={ <MainPage/> }/>
        <Route path='/manage/athletes' element={ <ManageAthletes/> } />
        <Route path='/manage/results' element={ <ManageResults/> } />
        <Route path='/manage/edit-result/:resultId' element={ <EditResult/> } />
        <Route path='/manage/edit-athlete/:athleteId' element={ <EditAthlete/> } />

        <Route path='/result/:resultId' element={ <SingleResult/> } />
        <Route path='/athlete/:athleteId' element={ <SingleAthlete/> } />

        <Route path='/*' element={ <div>Page not found</div> } />
      </Routes>
    </>
  )
}

export default App
