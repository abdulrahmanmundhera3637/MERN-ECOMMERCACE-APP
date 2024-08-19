import React, { useEffect, useState } from 'react';
import AdminProductCard from '../components/AdminProductCard';
import UploadProducts from '../components/UploadProducts'; 
import SummeryApi from '../common'; 


const AllProducts = () => {
  const [openUploadProducts, setOpenUploadProducts] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummeryApi.allProduct.url);
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllProduct(dataResponse.data || []);
      } else {
        console.error('Failed to fetch products:', dataResponse.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []); // Empty dependency array ensures it runs only once on component mount

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 py-1 px-3 rounded-full hover:bg-red-600 hover:text-white transition-all"
          onClick={() => setOpenUploadProducts(true)}
        >
          Upload Products
        </button>
      </div>

      {/* All Products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => (
          <AdminProductCard data={product} key={index} fetchData={fetchAllProduct} />
        ))}
      </div>

      {/* Upload product component */}
      {openUploadProducts && <UploadProducts onClose={() => setOpenUploadProducts(false)}  fetchData={fetchAllProduct}/>}
    </div>
  );
};

export default AllProducts;
