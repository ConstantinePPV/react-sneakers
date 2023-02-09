import React from 'react'
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    fetch('https://63e4eeb08e1ed4ccf6e97948.mockapi.io/items')
      .then(res => res.json())
      .then(json => setItems(json))
  }, [])

  const onAddToCart =  (obj) => {
    if (!cartItems.includes(obj)) {
      setCartItems(prev => [...prev, obj])
    }

  }

  return (
    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            <input type="text" placeholder="Поиск..."/>
          </div>
        </div>

        <div className="d-flex justify-around flex-wrap">
          {items.map((item) => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавил в избранное')}
              onPlus={(obj) => onAddToCart(item)}
            />
          ))}

        </div>
      </div>
    </div>
  )
}

export default App