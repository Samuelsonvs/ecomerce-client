import React, { useState } from 'react';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveMail } from '../../redux/reduxSlice/mailSlice';

export default function Footer() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(saveMail(email))
    }
    return (
        <div>
            <div className="bg-indigo-600">
            <div className="flex justify-between flex-wrap mt-16 p-12 w-full h-auto">
                <div className="w-full sm:w-2/4">
                    <ul className="list-none flex justify-between text-white">
                        <li><h2>Lorem</h2>
                            <ul className="list-none">
                                <li className="hover:underline"><Link>Lorem</Link></li>
                                <li className="hover:underline"><Link>Lorem</Link></li>
                                <li className="hover:underline"><Link>Lorem</Link></li>
                            </ul>
                        </li>
                        <li><h2>Lorem</h2>
                            <ul className="list-none">
                                <li className="hover:underline"><Link>Lorem</Link></li>
                                <li className="hover:underline"><Link>Lorem</Link></li>
                                <li className="hover:underline"><Link>Lorem</Link></li>
                            </ul>
                        </li>
                        <li><h2>Lorem</h2>
                            <ul className="list-none">
                                <li className="hover:underline"><Link>Lorem</Link></li>
                                <li className="hover:underline"><Link>Lorem</Link></li>
                                <li className="hover:underline"><Link>Lorem</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="mt-20 sm:mt-0">
                    <section>
                        <h2 className="text-white font-bold">Keep In Touch</h2>
                        <form className="form" onSubmit={submitHandler}>
                            <div className="manual-form-w bg-white h-20 flex items-center mt-5">
                                <label className="ml-3 mr-2 font-extrabold text-3xl text-gray-500" htmlFor="footerEmail">Email</label>
                                <input type="email" id="footerEmail" onChange={(e) => setEmail(e.target.value)} className="outline-none w-64"></input>
                                <button className="outline-none bg-white"><FaArrowAltCircleRight className="w-16 h-16 text-indigo-600" /></button>
                            </div>
                        </form>
                    </section>
                    <section className="flex flex-wrap justify-evenly mt-5">
                        <Link>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.125 9.66666H16.4938C15.8437 9.66666 15.7084 9.93371 15.7084 10.6068V12.0833H18.125L17.8724 14.5H15.7084V22.9583H12.0834V14.5H9.66663V12.0833H12.0834V9.29449C12.0834 7.15695 13.2083 6.04166 15.7434 6.04166H18.125V9.66666ZM14.5 0C6.49238 0 0 6.49238 0 14.5C0 22.5076 6.49238 29 14.5 29C22.5076 29 29 22.5076 29 14.5C29 6.49238 22.5076 0 14.5 0Z" fill="white"></path></svg>
                        </Link>
                        <Link>
                            <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22.3297 11.6544C22.5508 16.5361 18.9102 21.9796 12.465 21.9796C10.505 21.9796 8.68166 21.4044 7.14587 20.4196C8.98737 20.6371 10.8252 20.126 12.2837 18.9817C10.766 18.9539 9.48278 17.951 9.04053 16.5723C9.58549 16.6762 10.1207 16.6448 10.6089 16.5131C8.94018 16.176 7.78749 14.674 7.82495 13.0657C8.29378 13.3255 8.82784 13.4814 9.39697 13.4995C7.85151 12.4664 7.41408 10.4255 8.32275 8.86554C10.0338 10.9656 12.5918 12.348 15.4761 12.4918C14.9698 10.3216 16.6167 8.23117 18.8582 8.23117C19.855 8.23117 20.7577 8.65166 21.3909 9.32712C22.1811 9.17124 22.9242 8.88247 23.5948 8.48492C23.3351 9.29572 22.7853 9.9748 22.0687 10.405C22.7708 10.3204 23.4402 10.1343 24.0625 9.85757C23.5973 10.5536 23.0088 11.165 22.3297 11.6544ZM15 0C6.99238 0 0.5 6.49238 0.5 14.5C0.5 22.5076 6.99238 29 15 29C23.0076 29 29.5 22.5076 29.5 14.5C29.5 6.49238 23.0076 0 15 0Z" fill="white"></path></svg>
                        </Link>
                        <Link>
                            <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M23.4076 17.9872C23.2686 21.0637 21.5564 22.7662 18.4884 22.9076C17.5858 22.9487 17.297 22.9583 15 22.9583C12.703 22.9583 12.4153 22.9487 11.5127 22.9076C8.4387 22.7662 6.73378 21.06 6.59241 17.9872C6.55132 17.0858 6.54163 16.7983 6.54163 14.5C6.54163 12.203 6.55132 11.9154 6.59241 11.0128C6.73378 7.93876 8.43991 6.2338 11.5127 6.09363C12.4153 6.05255 12.703 6.04166 15 6.04166C17.297 6.04166 17.5858 6.05255 18.4884 6.09363C21.5636 6.2338 23.2698 7.94359 23.4076 11.0128C23.4487 11.9154 23.4584 12.203 23.4584 14.5C23.4584 16.7983 23.4487 17.0858 23.4076 17.9872ZM15 0C6.99238 0 0.5 6.49238 0.5 14.5C0.5 22.5076 6.99238 29 15 29C23.0076 29 29.5 22.5076 29.5 14.5C29.5 6.49238 23.0076 0 15 0ZM17.8202 14.5C17.8202 16.0575 16.5575 17.319 15 17.319C13.4425 17.319 12.1798 16.0575 12.1798 14.5C12.1798 12.9437 13.4425 11.681 15 11.681C16.5575 11.681 17.8202 12.9437 17.8202 14.5ZM19.5143 11.0007C18.9536 11.0007 18.4994 10.5463 18.4994 9.98566C18.4994 9.42499 18.9536 8.97067 19.5143 8.97067C20.0762 8.97067 20.5305 9.42499 20.5305 9.98566C20.5305 10.5463 20.0762 11.0007 19.5143 11.0007ZM15 18.844C12.6015 18.844 10.656 16.8997 10.656 14.5C10.656 12.1015 12.6015 10.1573 15 10.1573C17.3985 10.1573 19.344 12.1015 19.344 14.5C19.344 16.8997 17.3985 18.844 15 18.844ZM18.4183 7.61612C17.5266 7.57504 17.2584 7.56659 15 7.56659C12.7416 7.56659 12.4746 7.57504 11.5829 7.61612C9.28827 7.72004 8.21999 8.80753 8.11487 11.0828C8.07499 11.9746 8.06543 12.2416 8.06543 14.5C8.06543 16.7584 8.07499 17.0254 8.11487 17.9172C8.21999 20.1888 9.28464 21.2812 11.5829 21.3863C12.4734 21.4262 12.7416 21.4358 15 21.4358C17.2584 21.4358 17.5266 21.4262 18.4183 21.3863C20.713 21.2812 21.78 20.1913 21.8851 17.9172C21.925 17.0254 21.9346 16.7584 21.9346 14.5C21.9346 12.2416 21.925 11.9746 21.8851 11.0828C21.78 8.80753 20.7118 7.72004 18.4183 7.61612Z" fill="white"></path></svg>
                        </Link>
                        <Link>
                            <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.5834 11.6701L18.5247 14.4952L12.5834 17.3311V11.6701ZM20.3662 20.4124C17.8275 20.5852 12.1689 20.584 9.63257 20.4124C6.88241 20.2239 6.56217 18.8766 6.54163 14.5C6.56217 10.115 6.88603 8.77734 9.63257 8.58884C12.1689 8.41605 17.8275 8.41484 20.3662 8.58884C23.1176 8.77734 23.4366 10.1234 23.4584 14.5C23.4366 18.885 23.114 20.2239 20.3662 20.4124ZM15 0C6.99238 0 0.5 6.49238 0.5 14.5C0.5 22.5076 6.99238 29 15 29C23.0076 29 29.5 22.5076 29.5 14.5C29.5 6.49238 23.0076 0 15 0Z" fill="white"></path></svg>
                        </Link>
                    </section>
                </div>
            </div>
            <div className="p-1 bg-blue-800">
                <p className="text-white text-center text-2xl">2021 ProT Animal Supplies, Inc. All rights reserved.</p>
            </div>
            </div>
        </div>
    )
}
