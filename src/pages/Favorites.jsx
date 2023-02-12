import React from 'react'
import Card from '../components/Card'
import AppContext from '../context'


function Favorites({onAddToFavorite}) {
  const { favorites } = React.useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex justify-around flex-wrap">
        {favorites.map((item) => (
          <Card
            key={item.id}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}

      </div>
    </div>
  )
}

export default Favorites