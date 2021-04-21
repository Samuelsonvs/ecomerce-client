import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generalListReceiver } from '../../redux/reduxSlice/listsSlice';
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import Checkbox from '@material-ui/core/Checkbox';
import LoadingBox from '../public/loadingBox';
import MessageBox from '../public/messageBox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PaginationUI from '../public/paginationUI';

const id = '123456789';

export default function ProductListScreen(props) {
    const [check, setCheck] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    const [noOfPages, setNoOfPages] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(4);
    const [choosen, setChoosen] = useState({
        value: [],
        choosens: []
    });
    const [pageNumber, setPageNumber] = useState(
        props.location.search ? 
        props.location.search.split('=')[1] : 1
    );       
    const USER_PATH = "/dashboard/productlist";


    // pagination
    const handleChange = (event, value) => {
        setPageNumber(value);
    };

    // indeterminate checkbox options
    const handleChangeCheck = (e) => {
        if (!check) {
            setChoosen({
                value:[...generalList.slice((pageNumber-1) * itemPerPage, pageNumber* itemPerPage).map((state) => state._id)],
                choosens:[...generalList.slice((pageNumber-1) * itemPerPage, pageNumber* itemPerPage)]
            })
        } else {
            setChoosen({
                value: [],
                choosens: []
            })
        }
    };


    // generalList filter
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
    };

    // checkbox handler
    const handleChoosenList = (e) => {
        e.stopPropagation();
        if (e.target.checked === true) {
            setChoosen({
                ...choosen,
                value:[...choosen.value,JSON.parse(e.target.value)._id],
                choosens:[...choosen.choosens,JSON.parse(e.target.value)]
            })
        } else {
            setChoosen({
                value:[...choosen.value.filter((state) => 
                    state !== JSON.parse(e.target.value)._id)],
                choosens:[...choosen.choosens.filter((state) => 
                    state._id !== JSON.parse(e.target.value)._id)]
            })
        }
    };




    // change product number in one page
    const pageChange = (event) => {
        setItemPerPage(event.target.value);
    };

  
    const productList = useSelector((state) => state.entities.lists);
    const { loading, error, generalList } = productList;



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(generalListReceiver())
    }, [dispatch]);



    useEffect(() => {
        if (filteredList.length !== 0) {
            setNoOfPages(Math.ceil(filteredList.length / itemPerPage))
        } else {
            setNoOfPages(Math.ceil(generalList.length / itemPerPage));
        }
    }, [filteredList, generalList, itemPerPage]);

    // intermediate checkbox controller by other checkbox
    useEffect(() => {
        if (choosen.value.length > 0) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [choosen]);

    return (
        <div>

            <div className="md:flex md:p-10">
                <aside className="w-full bg-white p-5 md:w-96">
                    <div className="mt-10 ml-3 text-indigo-700">
                        <h3 className="mb-5 border-b pb-5 font-semibold text-3xl">Kategoriler</h3>
                        <ul id="style-1" className="mt-10">
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Jako" onChange={filterFunc} />
                                    <span>TopList</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" value="Monk" onChange={filterFunc} />
                                    <span>LastEntered</span>
                                </label>
                            </li>
                            <li>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>Hype</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </aside>
                {loading ? (
                    <LoadingBox />
                    ) : error ? (
                        <MessageBox />
                    ) : (
                        <div className="w-full">
                            <button className="float-right outline-none border focus:bg-indigo-300 rounded-full focus:outline-none" onClick={() => props.history.push(`/product/edit/${id}`)}>
                                <AiFillPlusCircle className="text-indigo-700 w-20 h-20" />
                            </button>
                            <button className={check ?"float-right outline-none border focus:bg-indigo-300 rounded-full focus:outline-none": "hidden"}>
                                <AiOutlineDelete className="text-indigo-700  w-20 h-20" />
                            </button>
                            <table class="clear-both table-fixed">
                                <thead>
                                    <tr>
                                    <th>
                                        <Checkbox
                                            checked={choosen.value.length > 0 ? true : check ? true : false}
                                            onChange={handleChangeCheck}
                                            style={{transform: "scale(1.5)"}}
                                            indeterminate={!check}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </th>
                                    <th class="w-2/5">Title</th>
                                    <th class="w-1/5">Author</th>
                                    <th class="w-1/5">Views</th>
                                    <th class="w-1/5">Views</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {(filteredList.length > 0 ? filteredList : generalList).slice((pageNumber-1) * itemPerPage, pageNumber* itemPerPage)
                                    .map((state, key) => {
                                        return (
                                        <tr key={state._id}>
                                            <td>
                                                <Checkbox
                                                    checked={choosen.value.includes(state._id) ? true : false}
                                                    onChange={handleChoosenList}
                                                    style={{transform: "scale(1.3)"}}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    value={JSON.stringify(state)}
                                                />
                                            </td>
                                            <td>{state._id}</td>
                                            <td>Adam</td>
                                            <td>858</td>
                                        </tr>

                                        )
                                    })}
                                </tbody>
                            </table>

                            <FormControl style={{marginTop:'20px', float:'right', marginRight:'20px'}} variant="outlined">
                                <InputLabel style={{fontSize:'15px'}} htmlFor="outlined-age-native-simple">Page</InputLabel>
                                <Select
                                    style={{fontSize:'15px'}}
                                    native
                                    value={itemPerPage}
                                    onChange={pageChange}
                                    label="Page"
                                    inputProps={{
                                        name: 'page',
                                    }}
                                    >
                                    <option value={4}>4</option>
                                    <option value={6}>6</option>
                                    <option value={12}>12</option>
                                    <option value={20}>20</option>
                                </Select>
                            </FormControl>

                        </div>
                    )}
            </div>
            <div className="flex justify-center mt-20">
                <PaginationUI
                    pageNumber={pageNumber}
                    noOfPages={noOfPages}
                    USER_PATH={USER_PATH}
                    handleChange={handleChange}
                />
            </div>
        </div>
    )
}
