import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../redux/reduxSlice/productDetailSlice';

export default function ProductDetailScreen(props) {
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.entities.productDetail);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailProduct(productId));
    }, [dispatch, productId])
    return (
        <div>
            <p>hosgeldin samuel</p>
            <p>{product.name}</p>
        </div>
    )
}
