import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import SingleUser from './pages/SingleUser'
import EditTodo from './pages/EditTodo'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <MainPage/> } />
        <Route path="/user/:id" element={<SingleUser />} />
        <Route path="/edit-todo/:todoId" element={<EditTodo />} />
      </Routes>
    </>
  )
}

export default App
