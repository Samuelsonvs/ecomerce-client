import React, { useEffect, useState } from 'react';
import FilterableList from '../components/public/filterableList';
import Hype from '../components/public/hype';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/public/loadingBox';
import MessageBox from '../components/public/messageBox';
import { RegionDropdown } from 'react-country-region-selector';
import PaginationUI from '../components/public/paginationUI';
import { generalListReceiver } from '../redux/reduxSlice/listsSlice';


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
    const products = useSelector((state) => state.entities.lists);

    const {loading, error, generalList, hypeList} = products;

    const selectRegion = (val) => {
        setRegion(val)
    };

    const filterFunc = (e) => {
        e.stopPropagation();
        if (e.target.checked === true) {
            setFilteredList([
                ...filteredList,
                ...(generalList.filter((state) => 
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
        dispatch(generalListReceiver());
    }, [dispatch]);

    useEffect(() => {
        if (filteredList.length !== 0) {
            setNoOfPages(Math.ceil(filteredList.length / itemPerPage))
        } else {
            setNoOfPages(Math.ceil(generalList.length / itemPerPage));
        }
        setPageNumber(1);
    }, [filteredList, generalList]);
    
    return (
        <>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox />
            ) : (
            <>
            <Hype hypeList={hypeList} />
            <div className="md:flex md:p-10">
                <aside className="w-full bg-white p-5 md:w-96">
                    <div className="mt-10 ml-3 text-indigo-700">
                        <h3 className="mb-5 border-b pb-5 font-semibold text-3xl">Kategoriler</h3>
                        <ul id="style-1" className="mt-10">
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Budgie" onChange={filterFunc}/>
                                    <span>Budgie</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Canary" onChange={filterFunc}/>
                                    <span>Canary</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Finch" onChange={filterFunc}/>
                                    <span>Finch</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Lovebird" onChange={filterFunc}/>
                                    <span>Lovebird</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Cockatiel" onChange={filterFunc}/>
                                    <span>Cockatiel</span>
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
                                    <input type="checkbox" value="Alexandrine" onChange={filterFunc}/>
                                    <span>Alexandrine</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Amazon" onChange={filterFunc}/>
                                    <span>Amazon</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Africangrey" onChange={filterFunc} />
                                    <span>African Grey</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Forpus" onChange={filterFunc}/>
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
                                    <input type="checkbox" value="Roseringed" onChange={filterFunc}/>
                                    <span>Rose-ringed</span>
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
                <FilterableList generalList={filteredList.length !== 0 ? filteredList : generalList} pageNumber={pageNumber} itemPerPage={itemPerPage} />           
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