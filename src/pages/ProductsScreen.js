import { Pagination, PaginationItem } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import Category from '../components/public/category';
import FilterableList from '../components/public/filterableList';
import Hype from '../components/public/hype';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productAll } from '../redux/reduxSlice/allProductSlice';
import LoadingBox from '../components/public/loadingBox';
import MessageBox from '../components/public/messageBox';

const listed = [1,2,3,4];

export default function ProductsScreen(props) {
    const [noOfPages, setNoOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(
        props.location.search ? 
        props.location.search.split('=')[1] :
        1);
    const itemPerPage = 4;

    const products = useSelector((state) => state.entities.receivedProduct);

    const {loading, error, list} = products;



    const handleChange = (event, value) => {
        setPageNumber(value);
    };
    
    const USER_PATH = "/ilanlar";

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(productAll())
    }, [dispatch]);

    useEffect(() => {
        setNoOfPages(Math.ceil(list.length / itemPerPage))
    }, [list]);
    return (
        <>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox />
            ) : (
            <>
            <Hype />
            <div className="md:flex md:p-10">
                <Category />
                <FilterableList list={list} pageNumber={pageNumber} itemPerPage={itemPerPage} />           
            </div>
           
            <div className="flex justify-center mt-20">
                <Pagination
                    page={Number(pageNumber)}
                    count={noOfPages}
                    shape="rounded"
                    color="primary"
                    boundaryCount={2}
                    showFirstButton
                    showLastButton
                    onChange={handleChange}
                    renderItem={(item) => (
                                <PaginationItem
                                    type={"start-ellipsis"}
                                    component={Link}
                                    selected
                                    to={`${USER_PATH}?syf=${item.page}`}
                                    {...item}
                        />
                    )}
                />
            </div>
            </>
            )}
        </>
    )
}