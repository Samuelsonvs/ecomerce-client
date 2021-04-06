import { Pagination, PaginationItem } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import FilterableList from '../components/public/filterableList';
import Hype from '../components/public/hype';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productAll } from '../redux/reduxSlice/allProductSlice';
import LoadingBox from '../components/public/loadingBox';
import MessageBox from '../components/public/messageBox';
import { makeStyles } from '@material-ui/core';
import { RegionDropdown } from 'react-country-region-selector';

const useStyles = makeStyles(theme => ({
    paginator: {
      padding: "10px"
    },
    root: {
        cursor: 'pointer',
    }
}));

export default function ProductsScreen(props) {
    const [ country ] = useState('Turkey');
    const [ region, setRegion ] = useState('İl');
    const [filteredList, setFilteredList] = useState([]);
    const [noOfPages, setNoOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(
        props.location.search ? 
        props.location.search.split('=')[1] :
        1);
        
    const itemPerPage = 4;
    const USER_PATH = "/ilanlar";
    const classes = useStyles();
    const products = useSelector((state) => state.entities.receivedProduct);

    const {loading, error, list} = products;

    const selectRegion = (val) => {
        setRegion(val)
    };

    const filterFunc = (e) => {
        e.stopPropagation();
        if (e.target.checked === true) {
            setFilteredList([
                ...filteredList,
                ...(list.filter((state) => 
                    state.category === e.target.value))]);
        } else {
            setFilteredList([
                ...filteredList.filter((state) => 
                    state.category !== e.target.value)])
        }
    }

    const handleChange = (event, value) => {
        setPageNumber(value);
    };
    

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(productAll())
    }, [dispatch]);

    useEffect(() => {
        setNoOfPages(Math.ceil(list.length / itemPerPage))
    }, [list]);

    //
    useEffect(() => {
        if (filteredList.length !== 0) {
            setNoOfPages(Math.ceil(filteredList.length / itemPerPage))
        } else {
            dispatch(productAll())
        };
    }, [filteredList, dispatch]);
    
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
                <aside className="w-full bg-white p-5 md:w-96">
                    <div className="mt-10 ml-3 text-indigo-700">
                        <h3 className="mb-5 border-b pb-5 font-semibold text-3xl">Kategoriler</h3>
                        <ul id="style-1" className="mt-10">
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Muhabbet Kuşu</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Kanarya</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Hint Bülbülü</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Cennet Papağanı</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Sultan Papağanı</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Kakadu</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Alexander(iskender)</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Amazon</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Jako" onChange={filterFunc} />
                                    <span>Jako</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Forpus</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Monk" onChange={filterFunc}/>
                                    <span>Monk</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Pakistan</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Diğer...</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-20 ml-3">
                        <h3 className="mb-5 border-b pb-5 font-semibold text-2xl text-indigo-700">Age</h3>
                        <ul className="text-white block p-4">
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>0 - 5 month</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>6 - 11 month</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>1 - 2 year</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>2 + year</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-20">
                        <h3 className="mb-5 border-b pb-5 font-semibold text-2xl text-indigo-700">Province</h3>
                        {/* <CountryDropdown
                            value={country}
                            onChange={(val) => selectCountry(val)} 
                            /> */}
                        <RegionDropdown
                            country={country}
                            value={region}
                            onChange={(val) => selectRegion(val)}
                            />
                    </div>
                </aside>
                <FilterableList list={filteredList.length !== 0 ? filteredList : list} pageNumber={pageNumber} itemPerPage={itemPerPage} />           
            </div>
           
            <div className="flex justify-center mt-20">
                <Pagination
                    page={Number(pageNumber)}
                    count={noOfPages}
                    shape="round"
                    color="primary"
                    boundaryCount={2}
                    showFirstButton
                    showLastButton
                    onChange={handleChange}
                    classes={{ ul: classes.paginator }}
                    renderItem={(item) => (
                                <PaginationItem
                                    type={"start-ellipsis"}
                                    component={Link}
                                    selected
                                    // classes={{ a: classes.root }}
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