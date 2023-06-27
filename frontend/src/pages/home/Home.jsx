import React, {useState, useEffect} from 'react'
import axios from 'axios'
import LayoutApp from '../../components/Layout'
import { Row, Col } from 'antd';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('mouses');
  const categories = [
    {
      name: "mouses",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/5921/5921702.png",
    },
    {
      name: "headphones",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/7005/7005175.png",
    },
    {
      name: "keyboards",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2671/2671347.png",
    },
    {
      name: "pads",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/5921/5921807.png",
    },

  ]

  useEffect(() => {
    const getAllProducts = async () => {
        try {
          dispatch({
            type: "SHOW_LOADING",
          });
          const {data} = await axios.get('/api/products/getproducts');
          setProductData(data);
          dispatch({
            type: "HIDE_LOADING",
          });
          console.log(data);

        } catch(error) {
          console.log(error);
        }
      };

      getAllProducts();
  }, [dispatch]);
  

  return (
    <LayoutApp>
      <div className="category">
        {categories.map((category) => (
          <div key={category.name} className={`categoryFlex ${selectedCategory === category.name && 'category-active'}`} onClick={() => setSelectedCategory(category.name)}>
            <h3 className="categoryName">{category.name}</h3>
            <img src={category.imageUrl} alt={category.name} height={60} width={60} />
          </div>
        ))}
      </div>
      <Row>
        {productData.filter((i) => i.category === selectedCategory).map((product) => (
          <Col xs={24} sm={6} md={12} lg={6}>
            <Product key={product.id} product={product} />
          </Col>
        ))}
      </Row>
    </LayoutApp>
  )
}

export default Home
