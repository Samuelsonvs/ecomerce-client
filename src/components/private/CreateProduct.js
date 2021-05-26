import InputLabel from '../public/inputLabel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../public/loadingBox';
import MessageBox from '../public/messageBox';
import { SwalWarning, SwalUpdateWarning, SwalError } from '../../helpers/sweetalert2';
import CreateButton from '../public/createButton';
import { RegionDropdown } from 'react-country-region-selector';
import { makeStyles } from '@material-ui/core';
import Checkbox from '../public/checkbox';

import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { createProduct, requestProduct } from '../../redux/reduxSlice/productDetailSlice';
import RadioGroupSchema from '../public/radioGroupSchema';

const useStyles = makeStyles({
    input: {
        display: 'none',
    },
    button: {
        fontSize: '1.3rem'
    },
});



export default function CreateProduct(props) {
    const value = props.location.value === undefined ? "" : props.location.value;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [city, setCity] = useState(value.city || '');
    const [name, setName] = useState(value.name || '');
    const [category, setCategory] = useState(value.category || '');
    const [phone, setPhone] = useState(value.phone || '');
    const [gender, setGender] = useState(value.gender || '');
    const [age, setAge] = useState(value.age || '');
    const [description, setDescription] = useState(value.description || '');
    const [seller, setSeller] = useState(value.seller || '');
    const [options, setOptions] = useState( value.options || { 
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

    const adminSignin = useSelector((state) => state.entities.adminPanel);
    const { adminInfo } = adminSignin;


    const submitHandler = async (e) => {
        e.preventDefault();
        if (
            city.length < 1 || 
            category.length < 1 || 
            gender.length < 1 || 
            age.length < 1 || 
            seller.length < 1 
            ) {
            SwalError('Please enter the information completely')
        } else {
            if (pictures.length < 1) {
                SwalError('Pls insert image')
            } else {
                if ((pictures.map((state) => state.size > 350000 ? false : true)).includes(false)) {
                    SwalError('Max image size exceed')
                } else {
                        SwalUpdateWarning('Warning!', 'Are you sure you want to update?', props, async () => {
                            //"for local upload" const randompath = Math.random().toString(36).substring(2) + Date.now().toString();
                            const bodyFormData = new FormData();
                            pictures.map((state) => bodyFormData.append('image', state));
                            await Axios.post((adminInfo ? '/uploads/create': '/uploads/request'), bodyFormData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: `Bearer ${JSON.stringify(adminInfo ? adminInfo.token : userInfo.token)}`,
                                    //"for local upload" Path: randompath 
                                },
                            }).then((state) => state.statusText === 'OK' ?
                                     dispatch(
                                        (adminInfo ? createProduct : requestProduct)({         
                                            name,
                                            path: value === "" ? 'create' : 'admincreate',
                                            city,
                                            owner: value.owner || userInfo.name,
                                            phone,
                                            category,
                                            gender,
                                            image: state.data.paths,       //"for local upload" image: value === "" ? randompath : state.data.paths,
                                            age,
                                            description,
                                            seller,
                                            options
                                        })
                                        )
                                        :
                                        SwalError('Image upload fail')
                                    )
                        })
                }
            }
        }
    }

    // if not have value image max 6
    useEffect(() => {
        if (pictures.length > 6 && value === "") {setPictures(pictures.slice(0,6))}
    }, [pictures,value])

    return (
        <div className="md:flex max-w-screen-2xl md:justify-center ml-2">
            <div className="mt-20 md:w-2/5 flex-shrink-0">
                <h2 className="text-center text-gray-700 mb-10 text-4xl font-extrabold">Advert Details</h2>
                
            <form className="form" onSubmit={submitHandler}>
                {loading && <LoadingBox></LoadingBox>}
                {error &&  <MessageBox variant="error">{error}</MessageBox>}
                {value !== "" &&
                    <InputLabel
                    type='text'
                    disable={true}
                    tag='imagefile'
                    name='Imagefile'
                    value={value.image}
                    />
                }

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
                        <option value='none'>Select an Option</option>
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
                <RadioGroupSchema
                    arialabel={"lists"}
                    name={"lists1"}
                    value={gender}
                    values={
                        [
                            "male", 
                            "female",
                            "mixed",
                        ]
                    }
                    label={
                        [
                            "Male",
                            "Female",
                            "Mixed"
                        ]
                    }
                    callback={setGender}
                    />   
                <InputLabel
                    type='text'
                    disable={true}
                    tag='age'
                    name='Age'
                    value={age}
                    />
                <RadioGroupSchema
                    arialabel={"agelist"}
                    name={"agelist1"}
                    value={age}
                    values={
                        [
                            "0-5 month", 
                            "6-11 month",
                            "1-2 year",
                            "2+ year"
                        ]
                    }
                    callback={setAge}
                    />

                <InputLabel
                    type='text'
                    tag='name'
                    name='Ads Name'
                    value={name}
                    callback={setName}
                    />
                <div className="mt-10">
                    <label className="text-gray-600 font-semibold" htmlFor='phone'>Phone</label>
                    <input
                        className="mt-2 block w-full p-2 h-16 border border-transparent rounded-md"
                        type='tel'
                        id='phone'
                        placeholder="0123 456 78 90"
                        pattern={"[0-9]{4} [0-9]{3} [0-9]{2} [0-9]{2}"}
                        defaultValue={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    ></input>
                </div>
                <div className="mt-10">
                    <label className="text-gray-600 font-semibold" htmlFor='description'>Description</label>
                    <textarea
                        className="mt-2 resize-y  block w-full p-2 border border-transparent rounded-md"
                        type='text'
                        rows='4'
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
                <RadioGroupSchema
                    arialabel={"seller"}
                    name={"seller1"}
                    value={seller}
                    values={
                        [
                            "By owner", 
                            "Producer",
                        ]
                    }
                    callback={setSeller}
                    />
                <div>
                <ul id="style-1" className="mt-10">
                    <label className="mb-10 text-gray-600 font-semibold block">Options</label>
                    <Checkbox name={"Boost in Hype just $5"} checked={options['hypeList']} value={'hypeList'} fnc={optionHandler}/>
                    <Checkbox name={"Boost in TopList just $10"} checked={options['topList']} value={'topList'} fnc={optionHandler} />
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