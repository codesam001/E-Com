import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;



const Products = ({ cat, filters, sort }) => {


  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);  //when ever we are gonna change we are our filter we are gonna update this filter 
  

//this is for our all products and connect it with backend

  useEffect(() => {
    const getProducts = async () => {   //we will get products from here 
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);


  //when ever we change our filter we will set our filters products

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>   //if any item include dos filter dos key and values we are gonna display them
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);
  
  //this will sort the products by price, newest etc
  

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);




  return (
    <Container>
      {/* it means ager category ho to filterProduct fikhana nhi to products it means all products */}
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)  //this is for to show maximum 8 items
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;

