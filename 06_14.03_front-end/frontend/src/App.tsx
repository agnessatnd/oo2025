
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import ManageProducts from './pages/ManageProducts';
import ManageCategories from './pages/ManageCategories';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Arrayd from './pages/Arrayd';
import Menu from './components/Menu';

function App() {
  return (
    <>
    <Menu />
      <Routes>
        <Route path='/' element={ <MainPage/> }/>
        <Route path='/manage/products' element={ <ManageProducts/> }/>
        <Route path='/manage/categories' element={ <ManageCategories/> }/>
        <Route path='/orders' element={ <Orders/> }/>
        <Route path='/cart' element={ <Cart/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/arrays' element={ <Arrayd/> }/>

        <Route path='/*' element={ <div>Page not found</div> }/>
      </Routes>
    </>
  )
}

export default App
