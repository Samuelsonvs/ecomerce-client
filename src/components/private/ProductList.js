import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generalListReceiver, indexReceiver } from '../../redux/reduxSlice/listsSlice';
import Checkbox from '@material-ui/core/Checkbox';
import LoadingBox from '../public/loadingBox';
import MessageBox from '../public/messageBox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PaginationUI from '../public/paginationUI';
import { Button, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { Link } from 'react-router-dom';
import { SwalWarning } from '../../helpers/sweetalert2';

const id = '123456789';


const useStyles = makeStyles({
    root: {
        fontSize: '1.5rem',
        marginBottom: '5px'
    },
    radio: {
        transform: 'scale(1.2)',
    },
    radioLabel: {
        fontSize: '1.5rem'
    },
    spn : {
        display: 'inline-block'
    },
    button: {
        fontSize: '1.3rem',
        transform: 'scale(1.1)',
        marginRight: '20px',
        float: 'right',
    },
    updateButton: {
        fontSize: '1.1rem',
    }
});


export default function ProductList(props) {
    const classes = useStyles();
    const [check, setCheck] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    const [noOfPages, setNoOfPages] = useState(1);
    const [radioValue, setRadioValue] = useState('');
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
                value:[...(radioValue ? productList[radioValue] : generalList).slice((pageNumber-1) * itemPerPage, pageNumber* itemPerPage).map((state) => state._id)],
                choosens:[...(radioValue ? productList[radioValue] : generalList).slice((pageNumber-1) * itemPerPage, pageNumber* itemPerPage)]
            })
        } else {
            setChoosen({
                value: [],
                choosens: []
            })
        }
    };

    // filter Function
    const filterHandler = (e) => {
        setFilteredList([...(productList[e.target.value])]);
        setRadioValue(e.target.value)
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


    const createHandler = () => {
        SwalWarning('Warning!', 'Are you sure you want to create new product?', () => props.history.push(`/product/edit/${id}`))
    }

    const deleteHandler = () => {
        SwalWarning('Warning!', 'Are you sure you want to delete choosens product?', () => console.log(choosen.choosens, radioValue))
    }

    // change product number in one page
    const pageChange = (event) => {
        setItemPerPage(event.target.value);
    };

  
    const productList = useSelector((state) => state.entities.lists);
    const { loading, error, generalList } = productList;

    



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(generalListReceiver());
        dispatch(indexReceiver());
    }, [dispatch]);



    useEffect(() => {
        if (filteredList.length !== 0) {
            setNoOfPages(Math.ceil(filteredList.length / itemPerPage))
        } else {
            setNoOfPages(Math.ceil(generalList.length / itemPerPage));
        }
        setPageNumber(1);
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
                        <FormControl component="fieldset">
                            <FormLabel className={classes.root} component="legend">Lists</FormLabel>
                            <RadioGroup aria-label="lists" name="lists1" value={radioValue} onChange={filterHandler}>
                                <FormControlLabel classes={{label: classes.radioLabel}} value="generalList" control={<Radio className={classes.radio} />} label="GeneralList" />
                                <FormControlLabel classes={{label: classes.radioLabel}} value="topList" control={<Radio className={classes.radio} />} label="TopList" />
                                <FormControlLabel classes={{label: classes.radioLabel}} value="latestList" control={<Radio className={classes.radio} />} label="LatestList" />
                                <FormControlLabel classes={{label: classes.radioLabel}} value="hypeList" control={<Radio className={classes.radio} />} label="HypeList" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </aside>
                {loading ? (
                    <LoadingBox />
                    ) : error ? (
                        <MessageBox />
                    ) : (
                        <div className="w-full">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={createHandler}
                                className={classes.button}
                                startIcon={<AddIcon />}
                            >
                                Create
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={deleteHandler}
                                disabled= {check ? false : true}
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button> 
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
                                    <th class="w-1/5">Thumb</th>
                                    <th class="w-1/5">Id</th>
                                    <th class="w-1/5">Owner</th>
                                    <th class="w-1/5">Category</th>
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
                                            <td><img className="w-48 h-48 object-cover mx-auto" src={state.image[0]}></img></td>
                                            <td>{state._id}</td>
                                            <td>{state.owner}</td>
                                            <td>{state.category}</td>
                                            <td>532</td>
                                            <td>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component={Link}
                                                    to={{
                                                        pathname:`/dashboard/update/${state._id}`,
                                                        value: {
                                                            id: state._id,
                                                            city: state.city,
                                                            name: state.name,
                                                            phone: state.phone,
                                                            category: state.category,
                                                            gender: state.gender,
                                                            age: state.age,
                                                            description: state.description,
                                                            seller: state.seller,
                                                            options: state.options
                                                        }
                                                    }}
                                                    className={classes.updateButton}
                                                    startIcon={<AutorenewIcon />}
                                                >
                                                Update
                                                </Button>
                                            </td>
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
