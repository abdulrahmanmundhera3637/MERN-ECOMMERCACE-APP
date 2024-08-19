import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/ProductsCategory';
import VerticalCard from '../components/VerticalCard';
import SummeryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll('category');
  const urlCategoryListObject = {};

  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummeryApi.filterProduct.url, {
      method: SummeryApi.filterProduct.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    setLoading(false);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    );

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      return index === arrayOfCategory.length - 1
        ? `category=${el}`
        : `category=${el}&`;
    });

    navigate('/product-category?' + urlFormat.join(''));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === 'asc') {
      setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === 'dsc') {
      setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className='container mx-auto p-4'>
      {/* Mobile and Tablet Version */}
      <div className='block lg:hidden'>
        {/* Filter and Sort */}
        <div className='bg-white p-4 mb-4'>
          {/* Sort By */}
          <div className='mb-4'>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Sort by
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                  value={'asc'}
                />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                  value={'dsc'}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/* Filter By */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Category
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName) => (
                <div className='flex items-center gap-3' key={categoryName.value}>
                  <input
                    type='checkbox'
                    name={'category'}
                    checked={selectCategory[categoryName.value]}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>{categoryName.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Product List */}
        <div>
          <p className='font-medium text-slate-800 text-lg my-2'>
            Search Results: {data.length}
          </p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-auto'>
            {!loading && data.length > 0 && <VerticalCard data={data} loading={loading} />}
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr] gap-4'>
        {/* Left Side */}
        <div className='bg-white p-4 min-h-[calc(100vh-120px)] overflow-y-auto'>
          {/* Sort By */}
          <div className='mb-4'>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Sort by
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                  value={'asc'}
                />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                  value={'dsc'}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/* Filter By */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Category
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName) => (
                <div className='flex items-center gap-3' key={categoryName.value}>
                  <input
                    type='checkbox'
                    name={'category'}
                    checked={selectCategory[categoryName.value]}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>{categoryName.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right Side (Product) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>
            Search Results: {data.length}
          </p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-auto'>
            {!loading && data.length > 0 && <VerticalCard data={data} loading={loading} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
