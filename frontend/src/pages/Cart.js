import React, { useContext, useEffect, useState } from 'react';
import SummeryApi from '../common';
import Context from '../context';
import { MdDelete } from 'react-icons/md';
import displayPKRCurrency from '../helpers/displayCurrency';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        try {
            const response = await fetch(SummeryApi.addToCartProductView.url, {
                method: SummeryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json'
                },
            });

            const responseData = await response.json();

            if (responseData.success) {
                setData(responseData.data);
            } else {
                console.error('Error fetching data:', responseData.error);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const increaseQty = async (id, qty) => {
        try {
            const response = await fetch(SummeryApi.updateCartProduct.url, {
                method: SummeryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ _id: id, quantity: qty + 1 })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty > 1) {
            try {
                const response = await fetch(SummeryApi.updateCartProduct.url, {
                    method: SummeryApi.updateCartProduct.method,
                    credentials: 'include',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ _id: id, quantity: qty - 1 })
                });

                const responseData = await response.json();

                if (responseData.success) {
                    fetchData();
                }
            } catch (error) {
                console.error('Update error:', error);
            }
        }
    };

    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(SummeryApi.deleteCartProduct.url, {
                method: SummeryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ _id: id })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * (curr.productId?.sellingPrice || 0)), 0);

    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center text-lg sm:text-xl my-3'>
                {data.length === 0 && !loading && (
                    <p className='bg-white py-5 text-sm sm:text-base'>No Data</p>
                )}
            </div>

            <div className='flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-10 lg:justify-between'>
                {/* View product */}
                <div className='w-full md:w-2/3'>
                    {loading ? (
                        loadingCart.map((_, index) => (
                            <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                        ))
                    ) : (
                        data.map((product) => (
                            <div key={product._id} className='w-full bg-white h-auto my-2 border border-slate-300 rounded grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[128px,1fr] gap-4'>
                                <div className='w-full sm:w-32 h-32 bg-slate-200'>
                                    <img
                                        src={product.productId?.productImage?.[0] || '/path/to/default/image.jpg'}
                                        className='w-full h-full object-cover'
                                        alt={product.productId?.productName || 'Product Image'}
                                    />
                                </div>
                                <div className='px-2 py-2 sm:px-4 sm:py-4 relative'>
                                    {/* Delete product */}
                                    <div
                                        className='absolute top-2 right-2 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                                        onClick={() => deleteCartProduct(product._id)}
                                    >
                                        <MdDelete />
                                    </div>

                                    <h2 className='text-base sm:text-lg lg:text-xl text-ellipsis line-clamp-1'>{product.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500 text-sm sm:text-base'>{product.productId?.category}</p>
                                    <div className='flex items-center justify-between mt-2'>
                                        <p className='text-red-600 font-medium text-sm sm:text-lg'>{displayPKRCurrency(product.productId?.sellingPrice)}</p>
                                        <p className='text-slate-600 font-semibold text-sm sm:text-lg'>{displayPKRCurrency(product.productId?.sellingPrice * product.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <button
                                            className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded text-sm'
                                            onClick={() => decreaseQty(product._id, product.quantity)}
                                        >
                                            -
                                        </button>
                                        <span className='text-sm sm:text-base'>{product.quantity}</span>
                                        <button
                                            className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded text-sm'
                                            onClick={() => increaseQty(product._id, product.quantity)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary */}
                <div className='w-full md:w-1/3'>
                    {loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                    ) : (
                        <div className='bg-white p-4 rounded shadow-md'>
                            <h2 className='text-white bg-red-600 px-4 py-2 rounded-t text-base sm:text-lg'>Summary</h2>
                            <div className='flex items-center justify-between mt-2 font-medium text-sm sm:text-base text-slate-600'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>

                            <div className='flex items-center justify-between mt-2 font-medium text-sm sm:text-base text-slate-600'>
                                <p>Total Price</p>
                                <p>{displayPKRCurrency(totalPrice)}</p>
                            </div>

                            <button className='bg-blue-600 p-2 text-white w-full mt-4 rounded text-sm sm:text-base'>Payment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
