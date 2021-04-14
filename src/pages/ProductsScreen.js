import React, { useEffect, useState } from 'react';
import FilterableList from '../components/public/filterableList';
import Hype from '../components/public/hype';
import { useDispatch, useSelector } from 'react-redux';
import { productAll } from '../redux/reduxSlice/allProductSlice';
import LoadingBox from '../components/public/loadingBox';
import MessageBox from '../components/public/messageBox';
import { RegionDropdown } from 'react-country-region-selector';
import PaginationUI from '../components/public/paginationUI';


export default function ProductsScreen(props) {
    const [ country ] = useState('Turkey');
    const [ region, setRegion ] = useState('İl');
    const [filteredList, setFilteredList] = useState([]);
    const [noOfPages, setNoOfPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(
        props.location.search ? 
        props.location.search.split('=')[1] :
        1);
        
    const itemPerPage = 4;
    const USER_PATH = "/ilanlar";
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
                    state.category !== e.target.value)]);
        }
    }

    const handleChange = (event, value) => {
        setPageNumber(value);
    };
    

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(productAll());
    }, [dispatch]);

    useEffect(() => {
        if (filteredList.length !== 0) {
            setNoOfPages(Math.ceil(filteredList.length / itemPerPage))
        } else {
            setNoOfPages(Math.ceil(list.length / itemPerPage));
        }
    }, [filteredList, list]);
    
    return (
        <>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox />
            ) : (
            <>
            <Hype list={list} />
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
                <PaginationUI
                        pageNumber={pageNumber}
                        noOfPages={noOfPages}
                        USER_PATH={USER_PATH}
                        handleChange={handleChange}
                />
            </div>
            </>
            )}
        </>
    )
}