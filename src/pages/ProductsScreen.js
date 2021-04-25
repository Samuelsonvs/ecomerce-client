import React, { useEffect, useState } from 'react';
import FilterableList from '../components/public/filterableList';
import Hype from '../components/public/hype';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/public/loadingBox';
import MessageBox from '../components/public/messageBox';
import { RegionDropdown } from 'react-country-region-selector';
import PaginationUI from '../components/public/paginationUI';
import { generalListReceiver } from '../redux/reduxSlice/listsSlice';
import Checkbox from '../components/public/checkbox';


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
                            <Checkbox value={"Budgie"} fnc={filterFunc}/>
                            <Checkbox value={"Canary"} fnc={filterFunc}/>
                            <Checkbox value={"Finch"} fnc={filterFunc}/>
                            <Checkbox value={"Lovebird"} fnc={filterFunc}/>
                            <Checkbox value={"Cockatiel"} fnc={filterFunc}/>
                            <Checkbox value={"Kakadu"} fnc={filterFunc}/>
                            <Checkbox value={"Alexandrine"} fnc={filterFunc}/>
                            <Checkbox value={"Amazon"} fnc={filterFunc}/>
                            <Checkbox value={"Africangrey"} name={"African Grey"} fnc={filterFunc}/>
                            <Checkbox value={"Forpus"} fnc={filterFunc}/>
                            <Checkbox value={"Monk"} fnc={filterFunc}/>
                            <Checkbox value={"Roseringed"} name={"Rose-ringed"} fnc={filterFunc}/>
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
                            <Checkbox value={"0-5 month"} fnc={filterFunc}/>
                            <Checkbox value={"6-11 month"} fnc={filterFunc}/>
                            <Checkbox value={"1-2 year"} fnc={filterFunc}/>
                            <Checkbox value={"2+ year"} fnc={filterFunc}/>                  
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