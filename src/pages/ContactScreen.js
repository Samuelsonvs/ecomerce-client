import React, { useState } from 'react';
import CreateButton from '../components/public/createButton';
import InputLabel from '../components/public/inputLabel';
import MessageBox from '../components/public/messageBox';
import { useDispatch, useSelector } from 'react-redux';
import { sendMail } from '../redux/reduxSlice/mailSlice';
import { SwalError } from '../helpers/sweetalert2';


export default function ContactScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [head, setHead] = useState('');
    const [description, setDescription] = useState('');
    const [sendMessage, setSendMessage] = useState(true);

    const userSignin = useSelector((state) => state.entities.signinOrRegister);

    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (userInfo) {
            setSendMessage(false);
            dispatch(sendMail(name, email, head, description));
        } else {
            SwalError('Login required')
        }
    }

    return (
        <div className="sm:flex max-w-screen-2xl sm:justify-center ml-2">
            <div className="mt-20 sm:w-2/5">
                {sendMessage ?
                
                <form className="form" onSubmit={submitHandler}>
                    <InputLabel
                        type='text'
                        tag='name'
                        name='Name'
                        value={name}
                        callback={setName}
                        />
                    <InputLabel 
                        type='email'
                        tag='email'
                        name='Email Address'
                        value={email}
                        callback={setEmail}
                        />
                    <InputLabel
                        type='text'
                        tag='head'
                        name='Head'
                        value={head}
                        callback={setHead}
                        />
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
                        <CreateButton name="Send"/>
                    </div>
                </form>
                :
                <MessageBox
                variant='success'
                children='Your message has been sent successfully'
                    />
                }
            </div>
        </div>
    )
}
