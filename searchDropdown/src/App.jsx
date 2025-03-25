import { useEffect, useState } from 'react'
import './App.css'
import Dropdown from './component/SearchDropDown/Dropdown'

function App() {

  const [productList, SetProductList] = useState([]);
  useEffect(() => {
    async function getProductList() {
      const response = await fetch(
        "https://dummyjson.com/products/category-list"
      );
      const data = await response.json();
      SetProductList(data);
    }
    getProductList();
  }, []);

  return (
    <div className="main-container">
        <Dropdown data={productList} />
    </div>
  )
}

export default App
