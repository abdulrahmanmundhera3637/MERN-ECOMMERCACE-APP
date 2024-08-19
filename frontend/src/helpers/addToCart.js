import { toast } from 'react-toastify';
import SummeryApi from '../common';

const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
        const response = await fetch(SummeryApi.addToCartProduct.url, {
            method: SummeryApi.addToCartProduct.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: id })
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        // Show success or error toast based on the response
        if (responseData.success) {
            toast.success(responseData.message);
        } else if (responseData.error) {
            toast.error(responseData.message);
        }

        return responseData;

    } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Product already exists in the cart.');
        return {
            success: false,
            message: error.message || 'An unexpected error occurred.'
        };
    }
};

export default addToCart;
