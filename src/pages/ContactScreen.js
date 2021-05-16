import React, { useState } from 'react';
import CreateButton from '../components/public/createButton';
import InputLabel from '../components/public/inputLabel';
import MessageBox from '../components/public/messageBox';


export default function ContactScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [sendMessage, setSendMessage] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        setSendMessage(false);
        console.log('submitted');
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
                            callback={setEmail}
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
                variant='Success'
                children='Your message has been sent successfully'
                    />
                }
            </div>
        </div>
       
    )
}
