import React from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

import AppContext from './context'


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    axios.get('http://localhost:3001/items').then(res => setItems(res.data))

    axios.get('http://localhost:3001/cart').then(res => setCartItems(res.data))

    axios.get('http://localhost:3001/favorites').then(res => setFavorites(res.data))
  }, [])

  // const onAddToCart = (obj) => {
  //   if (!cartItems.includes(obj)) {
  //     axios.post('http://localhost:3001/cart', obj)
  //     setCartItems(prev => [...prev, obj])
  //   }
  // }

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find(item => item.id === obj.id)) {
        setCartItems(prev => prev.filter(item => item.id !== obj.id))
        axios.delete(`http://localhost:3001/cart/${obj.id}`)
      } else {
        const {data} = await axios.post('http://localhost:3001/cart', obj)
        setCartItems(prev => [...prev, data])
      }
    } catch (err) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem = id => {
    axios.delete(`http://localhost:3001/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  // const onAddToFavorite = (obj) => {
  //   if (favorites.find(favObj => favObj.id === obj.id)) {
  //     axios.delete(`http://localhost:3001/favorites/${obj.id}`)
  //     setFavorites(prev => prev.filter(item => item.id !== obj.id))
  //   } else {
  //     axios.post('http://localhost:3001/favorites', obj)
  //     setFavorites(prev => [...prev, obj])
  //   }
  // }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => item.id !== obj.id))
      } else {
        const {data} = await axios.post('http://localhost:3001/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (err) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites}}>
      <div className="wrapper clear">

        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
        <Header onClickCart={() => setCartOpened(true)}/>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                // Sneakers={Sneakers}
              />
            }
          ></Route>

          <Route
            path="/favorites"
            element={
              <Favorites
                onAddToFavorite={onAddToFavorite}
              />
            }
          ></Route>
        </Routes>



      </div>
    </AppContext.Provider>
  )
}

export default App
