import { useState } from 'react'
import Header from '../../containers/Header/Header'
import Menu from '../../containers/Menu/Menu'
import './Shop.css'

const Shop = () => {

  const [data, setData] = useState([]);

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify({ cart: [] }));
  }

  return (
    <div>
      <Header data={data} setData={setData} />
      <Menu data={data} setData={setData} />
    </div>
  )
}

export default Shop