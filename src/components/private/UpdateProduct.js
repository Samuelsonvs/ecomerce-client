import InputLabel from '../public/inputLabel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../public/loadingBox';
import MessageBox from '../public/messageBox';
import { SwalWarning, SwalUpdateWarning } from '../../helpers/sweetalert2';
import { updateProduct } from '../../redux/reduxSlice/productDetailSlice';
import CreateButton from '../public/createButton';

export default function UpdateProduct(props) {
    const value = props.location.value;
    const [city, setCity] = useState(value.city);
    const [name, setName] = useState(value.name);
    const [phone, setPhone] = useState(value.phone);
    const [category, setCategory] = useState(value.category);
    const [gender, setGender] = useState(value.gender);
    const [age, setAge] = useState(value.age);
    const [description, setDescription] = useState(value.description);
    const [seller, setSeller] = useState(value.seller);
    const [options, setOptions] = useState(JSON.stringify(value.options));

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.entities.signinOrRegister);
    const { userInfo, loading, error } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        SwalUpdateWarning('Warning!', 'Are you sure you want to update?', props, () => {
            dispatch(
                updateProduct({
                    _id: value.id,
                    city,
                    name,
                    phone,
                    category,
                    gender,
                    age,
                    description,
                    seller,
                    options
                })
            )
        })
    }


    return (
        <div className="md:flex max-w-screen-2xl md:justify-center ml-2">
            <div className="mt-20 md:w-2/5 flex-shrink-0">
                <h2 className="text-center text-gray-700 mb-10 text-4xl font-extrabold">Product Details</h2>
                
 
            <form className="form" onSubmit={submitHandler}>
                {loading && <LoadingBox></LoadingBox>}
                {error &&  <MessageBox variant="error">{error}</MessageBox>}
                <InputLabel 
                    type='text'
                    tag='city'
                    name='City'
                    value={city}
                    callback={setCity}
                    />
                <InputLabel 
                    type='text'
                    tag='name'
                    name='Name'
                    value={name}
                    callback={setName}
                    />
                <InputLabel 
                    type='phone'
                    tag='phone'
                    name='Phone'
                    value={phone}
                    callback={setPhone}
                    />
                <InputLabel 
                    type='text'
                    tag='category'
                    name='Category'
                    value={category}
                    callback={setCategory}
                    />
                <InputLabel 
                    type='text'
                    tag='gender'
                    name='Gender'
                    value={gender}
                    callback={setGender}
                    />
                <InputLabel 
                    type='text'
                    tag='age'
                    name='Age'
                    value={age}
                    callback={setAge}
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
                <InputLabel 
                    type='text'
                    tag='seller'
                    name='Seller'
                    value={seller}
                    callback={setSeller}
                    />
                <InputLabel 
                    type='text'
                    tag='options'
                    name='Options'
                    value={options}
                    callback={setOptions}
                    />
                <div>
                <div className="mt-10">
                    <CreateButton name={'Update'} />
                </div>
                </div>
            </form>
            </div>
        </div>
    );
}