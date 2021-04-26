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
import { FormControl, FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';

const useStyles = makeStyles({
    radio: {
        transform: 'scale(1.2)',
    },
    radioLabel: {
        fontSize: '1.7rem',
        color: '#4338ca',
        fontWeight: '600'
    },
});


export default function ProductsScreen(props) {
    const classes = useStyles();
    const [radioValue, setRadioValue] = useState('');
    const [ country ] = useState('Turkey');
    const [ region, setRegion ] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [regionList, setRegionList] = useState([]);
    const [ageList, setAgeList] = useState([]);
    const [noOfPages, setNoOfPages] = useState(1);
    const [chaoticList, setChaoticList] = useState([]);
    const [pageNumber, setPageNumber] = useState(
        props.location.search ? 
        props.location.search.split('=')[1] :
        1);
        
    const itemPerPage = 4;
    const USER_PATH = "/ilanlar";
    const products = useSelector((state) => state.entities.lists);

    const {loading, error, generalList, hypeList} = products;


    // Region Handler
    const selectRegion = (val) => {
        setRegion(val);
        if (val === '') {
            setRegionList([])
        }
    };

    // Checkbox Handler
    const categoryCheckboxHandler = (e) => {
        e.stopPropagation();
        if (e.target.checked === true) {
            setCategoryList([
                ...categoryList,
                ...(generalList.filter((state) => 
                    state.category === e.target.value))]);
        } else {
            setCategoryList([
                ...categoryList.filter((state) => 
                    state.category !== e.target.value)]);
        }
    };

    // Radio Button Handler
    const radioButtonHandler = (e) => {
        if (e.target.value === 'All') {
            //setCaoticList([]);
            setAgeList([]);
        } else {     
            setAgeList([
                ...(generalList.filter((state) => 
                state.age === (e.target.value)))]);
        }
        setRadioValue(e.target.value);
    };

    const handleChange = (event, value) => {
        setPageNumber(value);
    };
    

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(generalListReceiver());
    }, [dispatch]);

    // If one list active at least 
    useEffect(() => {
        if (chaoticList.length !== 0) {
            setNoOfPages(Math.ceil(chaoticList.length / itemPerPage))
        } else {
            setNoOfPages(Math.ceil(generalList.length / itemPerPage));
        }
        setPageNumber(1);
    }, [chaoticList, generalList]);


    //regionList side effect
    useEffect(() => {
        if (region !== '') {
            setRegionList([
                ...(generalList.filter((state) => 
                state.city === region))]);
        }
    }, [region]);

    // Filter effect
    useEffect(() => {
        if (categoryList.length > 0 && ageList.length > 0 && regionList.length > 0) {
            setChaoticList([
                ...(categoryList.filter((state) => (state.age === (ageList[0].age)) && (state.city === (regionList[0].city))))
            ])
        } else if (categoryList.length > 0 && ageList.length > 0) {
            setChaoticList([
               ...(categoryList.filter((state) => state.age === (ageList[0].age) )) 
            ])
        } else if (categoryList.length > 0 && regionList.length > 0 ) {
            setChaoticList([
                ...(categoryList.filter((state) => state.city === (ageList[0].city) ))
            ])
        } else if (ageList.length > 0 && regionList.length) {
            setChaoticList([
                ...(ageList.filter((state) => state.city === (ageList[0].city)))
            ])
        } else if (categoryList.length > 0) {
            setChaoticList([
                ...categoryList
            ])
        } else if (ageList.length > 0) {
            setChaoticList([
                ...ageList
            ])
        } else if (regionList.length > 0) {
            setChaoticList([
                ...regionList
            ])
        } else {
            setChaoticList([])
        }
    }, [categoryList, ageList, regionList]);
    
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
                            <Checkbox value={"Budgie"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Canary"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Finch"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Lovebird"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Cockatiel"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Kakadu"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Alexandrine"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Amazon"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Africangrey"} name={"African Grey"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Forpus"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Monk"} fnc={categoryCheckboxHandler}/>
                            <Checkbox value={"Roseringed"} name={"Rose-ringed"} fnc={categoryCheckboxHandler}/>
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
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="lists" name="lists1" value={radioValue} onChange={radioButtonHandler}>
                                <FormControlLabel  classes={{label: classes.radioLabel}} value="0-5 month" control={<Radio className={classes.radio} />} label="0-5 month" />
                                <FormControlLabel  classes={{label: classes.radioLabel}} value="6-11 month" control={<Radio className={classes.radio} />} label="6-11 month" />
                                <FormControlLabel  classes={{label: classes.radioLabel}} value="1-2 year" control={<Radio className={classes.radio} />} label="1-2 year" />
                                <FormControlLabel  classes={{label: classes.radioLabel}} value="2+ year" control={<Radio className={classes.radio} />} label="2+ year" />
                                <FormControlLabel  classes={{label: classes.radioLabel}} value="All" control={<Radio className={classes.radio} />} label="All" />
                            </RadioGroup>
                        </FormControl>                 
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
                <FilterableList generalList={chaoticList.length !== 0 ? chaoticList : generalList} pageNumber={pageNumber} itemPerPage={itemPerPage} />           
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