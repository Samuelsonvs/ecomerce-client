import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../redux/reduxSlice/productDetailSlice';
import LoadingBox from '../components/public/loadingBox';
import MessageBox from '../components/public/messageBox';
import DetailPart from '../components/public/detailPart';

export default function ProductDetailScreen(props) {
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.entities.productDetail);
    const { loading, error, product } = productDetails;


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailProduct(productId));
    }, [dispatch, productId]);

    return (
        <div className="container sm:ml-5">
            {loading  ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant={"error"} >Hata Mesajı</MessageBox>
            ) : (
                <div>
                    <DetailPart product={product} />
                </div>
            )}
        </div>
    )
}
