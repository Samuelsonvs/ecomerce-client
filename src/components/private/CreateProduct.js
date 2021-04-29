import InputLabel from '../public/inputLabel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../public/loadingBox';
import MessageBox from '../public/messageBox';
import { SwalWarning, SwalUpdateWarning, SwalError } from '../../helpers/sweetalert2';
import CreateButton from '../public/createButton';
import { RegionDropdown } from 'react-country-region-selector';
import { FormControl, FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';
import Checkbox from '../public/checkbox';

import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { createProduct } from '../../redux/reduxSlice/productDetailSlice';

const useStyles = makeStyles({
    input: {
        display: 'none',
    },
    button: {
        fontSize: '1.3rem'
    },
    radio: {
        transform: 'scale(1.2)',
    },
    radioLabel: {
        fontSize: '1.7rem',
        color: '#4338ca',
        fontWeight: '600'
    },
});

export default function CreateProduct(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [seller, setSeller] = useState('');
    const [options, setOptions] = useState({
        "hypeList":false,
        "topList":false,
        "latestList":true
    });
    const [ country ] = useState('Turkey');

    const [pictures, setPictures] = useState([]);


    // image upload handler
    const onDrop = e => {
        e.preventDefault();
        setPictures([...pictures,...[...e.target.files]])
      };
      const clearPictures = () => {
        setPictures([]);
      }

    // are you want to your product inside topList or hypList or double
    const optionHandler = (e) => {
        e.stopPropagation();
        if (e.target.checked === true) {
            setOptions({...options, [e.target.value]:true})
        } else {
            setOptions({...options, [e.target.value]:false})
        }
    }

    const userSignin = useSelector((state) => state.entities.signinOrRegister);
    const { userInfo, loading, error } = userSignin;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (pictures.length < 1) {
            SwalError('Pls insert image')
        } else {

            // console.log(pictures[0].size)
            if ((pictures.map((state) => state.size > 350000 ? false : true)).includes(false)) {
                SwalError('Max image size exceed')
            } else {
                const randompath = Math.random().toString(36).substring(2) + Date.now().toString();
                const bodyFormData = new FormData();
                pictures.map((state) => bodyFormData.append('image', state));
                await Axios.post('/api/uploads/create', bodyFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userInfo.token}`,
                        Path: randompath 
                    },
                }).then((state) => state.statusText === 'OK' ?
                SwalUpdateWarning('Warning!', 'Are you sure you want to update?', props, () => {
                    dispatch(
                        createProduct({
                            city,
                            name,
                            category,
                            gender,
                            image: randompath,
                            age,
                            description,
                            seller,
                            options
                        })
                    )
                })  :
                console.log('image upload fail')
                ).then((state) => console.log(state))
            }
        }
    }

    // Max picture 6
    useEffect(() => {
        if (pictures.length > 6) setPictures(pictures.slice(0,6))
    }, [pictures])

    return (
        <div className="md:flex max-w-screen-2xl md:justify-center ml-2">
            <div className="mt-20 md:w-2/5 flex-shrink-0">
                <h2 className="text-center text-gray-700 mb-10 text-4xl font-extrabold">Advert Details</h2>
                
 
            <form className="form" onSubmit={submitHandler}>
                {loading && <LoadingBox></LoadingBox>}
                {error &&  <MessageBox variant="error">{error}</MessageBox>}
                <InputLabel 
                    type='text'
                    disable={true}
                    tag='city'
                    name='City'
                    value={city}
                    />
                <RegionDropdown
                    className="mt-5"
                    country={country}
                    value={city}
                    onChange={(val) => setCity(val)}
                />
                <InputLabel 
                    type='text'
                    disable={true}
                    tag='category'
                    name='Category'
                    value={category}
                    />
                <div className="mt-5">
                    <select name='variety' id='variety' onChange={(e) => setCategory(e.target.value)}>
                        <option value='none' selected disabled hidden>
                            Select an Option
                        </option>
                        <option value="Africangrey">African Grey</option>
                        <option value="Amazon">Amazon</option>
                        <option value="Alexandrine">Alexandrine</option>
                        <option value="Budgie">Budgie</option>
                        <option value="Canary">Canary</option>
                        <option value="Cockatiel">Cockatiel</option>
                        <option value="Finch">Finch</option>
                        <option value="Forpus">Forpus</option>
                        <option value="Kakadu">Kakadu</option>
                        <option value="Lovebird">Lovebird</option>
                        <option value="Monk">Monk</option>
                        <option value="Roseringed">Rose-ringed</option>
                        <option value="other">other...</option>
                    </select>
                </div>
                <InputLabel 
                    type='text'
                    disable={true}
                    tag='gender'
                    name='Gender'
                    value={gender}
                    />
                <FormControl component="fieldset">
                    <RadioGroup aria-label="lists" name="lists1" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel  classes={{label: classes.radioLabel}} value="male" control={<Radio className={classes.radio} />} label="Male" />
                        <FormControlLabel  classes={{label: classes.radioLabel}} value="female" control={<Radio className={classes.radio} />} label="Female" />
                        <FormControlLabel  classes={{label: classes.radioLabel}} value="mixed" control={<Radio className={classes.radio} />} label="Mixed" />                    
                    </RadioGroup>
                </FormControl>   
                <InputLabel 
                    type='text'
                    disable={true}
                    tag='age'
                    name='Age'
                    value={age}
                    />
                <FormControl component="fieldset">
                    <RadioGroup aria-label="agelist" name="agelists1" value={age} onChange={(e) => setAge(e.target.value)}>
                        <FormControlLabel  classes={{label: classes.radioLabel}} value="0-5 month" control={<Radio className={classes.radio} />} label="0-5 month" />
                        <FormControlLabel  classes={{label: classes.radioLabel}} value="6-11 month" control={<Radio className={classes.radio} />} label="6-11 month" />
                        <FormControlLabel  classes={{label: classes.radioLabel}} value="1-2 year" control={<Radio className={classes.radio} />} label="1-2 year" />                    
                        <FormControlLabel  classes={{label: classes.radioLabel}} value="2+ year" control={<Radio className={classes.radio} />} label="2+ year" />                    
                    </RadioGroup>
                </FormControl>
                <InputLabel 
                    type='text'
                    tag='name'
                    name='Name'
                    value={name}
                    callback={setName}
                    />
                <div className="mt-10">
                    <label className="text-gray-600 font-semibold" htmlFor='description'>Description</label>
                    <textarea
                        className="mt-2 block w-full p-2 h-16 border border-transparent rounded-md"
                        type='text'
                        id='description'
                        defaultValue={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                </div>
                <div className="mt-10">
                <label className="mb-10 text-gray-600 font-semibold block">Image</label>
                    <input
                        accept="image/*"
                        className={classes.input}
                        disabled={pictures.length >= 15 ? true : false}
                        id="contained-button-file"
                        multiple
                        onChange={onDrop}
                        type="file"
                    />
                    <label htmlFor="contained-button-file">
                    <Button 
                        disabled={pictures.length >= 15 ? true : false}
                        className={classes.button}
                        variant="contained" 
                        color="primary"
                        startIcon={<CloudUploadIcon style={{fontSize:'2.5rem'}} />} 
                        component="span">
                        Upload
                    </Button>
                    </label>
                </div>
                <div>
                    {
                        pictures.length > 0 && 
                        <div className="mt-20 ml-5">
                            {pictures.map((state, index) => {
                                return (
                                <img key={index} className="inline mr-5 mb-5 max-w-md max-h-72" src={URL.createObjectURL(state)} alt='preview'></img>
                                )
                            })}
                            <div className="mt-10">
                                <Button 
                                    className={classes.button}
                                    onClick={clearPictures}
                                    variant="contained" 
                                    color="secondary" 
                                    component="span">
                                    Clear
                                </Button>
                            </div>
                        </div>
                    }
                </div>
                <InputLabel 
                    type='text'
                    disable={true}
                    tag='seller'
                    name='Seller'
                    value={seller}
                    />
                <FormControl component="fieldset">
                    <RadioGroup aria-label="agelist" name="agelists1" value={seller} onChange={(e) => setSeller(e.target.value)}>
                        <FormControlLabel  classes={{label: classes.radioLabel}} value="By owner" control={<Radio className={classes.radio} />} label="By owner" />
                        <FormControlLabel  classes={{label: classes.radioLabel}} value="Producer" control={<Radio className={classes.radio} />} label="Producer" />
                    </RadioGroup>
                </FormControl> 
                <div>
                <ul id="style-1" className="mt-10">
                    <label className="mb-10 text-gray-600 font-semibold block">Options</label>
                    <Checkbox name={"Boost in Hype just $5"} value={'hypeList'} fnc={optionHandler}/>
                    <Checkbox name={"Boost in TopList just $10"} value={'topList'} fnc={optionHandler} />
                </ul>
                    <div className="mt-10">
                        <CreateButton name={'Create'} />
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
}