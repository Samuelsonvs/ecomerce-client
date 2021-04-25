import InputLabel from '../public/inputLabel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../public/loadingBox';
import MessageBox from '../public/messageBox';
import { SwalWarning } from '../../helpers/sweetalert2';
import { updateProduct } from '../../redux/reduxSlice/productDetailSlice';

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
        SwalWarning('Warning!', 'Are you sure you want to update?', props, () => {
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
        });
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
                    <label />                                         
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        Update
                    </button>
                </div>
                </div>

               
                
            </form>
            </div>
        </div>
    );
}