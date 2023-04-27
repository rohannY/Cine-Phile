import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError]=useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const token = cookies.token;

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');  // Redirect to the home page
        }
   }, [cookies]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            'http://localhost:7000/api/auth/register',
             JSON.stringify({name:name,email:email,password:password})
           ,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          setCookie('token', response.data.token);
          navigate('/');
        } catch (error) {
          setError(error.response.data.error);
        }
      };  

    return (
        <>
            <div className='w-full h-screen'>
                <img
                    className='hidden sm:block absolute w-full h-full object-cover'
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/83e8c151-107d-4e8f-b95a-d2ba99d49bb9/f1ac72e1-5adc-4caf-bceb-e8ec775414ac/IN-en-20230213-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="/"
                />
                <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
                <div className="fixed w-full px-4 py-24 z-50">
                    <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
                        <div className="max-w-[320px] mx-auto py-16">
                            <h1 className="text-3xl font-bold">Sign Up</h1>
                            <form
                                onSubmit={handleSubmit}
                                className='w-full flex flex-col py-4'
                            >
                                <input className='p-3 my-2 bg-gray-700 rounded outline-none'
                                    type="text"
                                    placeholder='Name'
                                    autoComplete='name'
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input className='p-3 my-2 bg-gray-700 rounded outline-none'
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input className='p-3 my-2 bg-gray-700 rounded outline-none'
                                    type="password"
                                    placeholder='Password'
                                    autoComplete='current-password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className="text-center font-satoshi text-red-500">{error}</p>
                                <button className="bg-red-600 py-3 my-6 rounded font-bold">Sign Up</button>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <p>Need Help?</p>
                                </div>
                                <p className='py-8'>
                                    <span className='text-gray-600'>
                                        Already subscribed to Netflix?
                                    </span>
                                    {" "}
                                    <Link to='/login'>
                                        Sign In
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup