import React from 'react'
import { useForm, SubmitHandler} from "react-hook-form";
import Image  from 'next/image'
import fetch_image from "../images/fetch.png"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface Item {
    name: string;
    abbreviation: string;
}

interface props {
    data: {
        occupations : string[];
        states: Item[];
    }
}

type Inputs = {
    name: string;
    email: string;
    password: string;
    password_check: string;
    occupation: string;
    state: string;
}; 

export default function Challenge({data} : props) {
    const { register, handleSubmit, formState:{errors}, getValues} = useForm<Inputs>();
    const multipleValues = getValues(["name", "email", "password", "occupation", "state"]);
    const onSubmit: SubmitHandler<Inputs> = async (formData) => 
        {const { name, email, password, occupation, state } = formData;
        const data = { name, email, password, occupation, state };
        try {
            const response = await fetch("https://frontend-take-home.fetchrewards.com/form", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
        
            if (response.status === 201) {
              console.log("Post succeeded")
            } else {
                console.error("Post failed")
            }
        } catch (error) {
            console.error(error);
        }
    };   

    return (
        <div className='relative h-screen flex overflow-hidden flex-col 
        px-5 justify-evenly items-center mx-auto bg-gradient-to-r from-[#fff5be] to-[#ffef89]'>
            <a href = "https://fetch.com/" target='_blank' rel='noopener noreferrer' className="border-t border-black flex-1 text-center ">
            <Image src = {fetch_image} alt=""  className = "absolute top-5 left-5 mb:left-1/2 mb:transform mb:-translate-x-1/2  w-[200px] h-[75px]"/>
            </a>
            <h1 className='mb:text-[20px] mb:tracking-[8px] mb:top-[6rem] absolute top-[5rem] uppercase tracking-[13px] text-[#300d38] font-bold text-[30px]'>
                    Fetch User Sign-up
            </h1>

            {/*form start*/}
            {/*********************/}
            <form onSubmit={handleSubmit(onSubmit)} className='mobile:scale-[.65] absolute top-[7rem] flex flex-col space-y-2 w-fit'>
                <div className ="flex space-x-2">
                    {/*name*/}
                    {/*********************/}
                    <input {...register('name', {required:true})} placeholder = "Name" className="fetchForm"  type="text"/>
                    {errors.name && errors.name.type == "required"}

                    {/*email*/}
                    {/*********************/}
                    <input {...register('email')} placeholder = "Email" type="email" pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title = "Email addresses must have @ followed by a valid email domain." className="fetchForm"/>
                    {errors.email && errors.email.type == "required"}
                </div>

                {/*password*/}
                {/*********************/}
                <input {...register('password')} placeholder = "Password" pattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$" title = "Passwords must contain at least 12 letters with a number, letter, uppercase letter and special character consisting of one of these #?!@$%^&*-."className="fetchForm" type="text"/>
                {errors.password && errors.password.type == "required"}

                {/*password check*/}
                {/*********************/}
                <input {...register('password_check')} placeholder = "Verify New Password" className="fetchForm" type="text"/>
                {errors.password_check && errors.password_check.type == "required"}

                {/*occupation*/}
                {/*********************/}
                <select defaultValue=""  {...register('occupation')} className="fetchForm">
                    <option disabled value="" >Select an Occupation</option>
                    {data.occupations.map((occupation, index) => (
                        <option key={index} value={occupation}>
                        {occupation}
                        </option>
                    ))}
                </select>
                {errors.occupation && errors.occupation.message !== "" && errors.occupation.type === "required"}
                
                {/*state*/}
                {/*********************/}
                <select {...register('state')} defaultValue=""  className="fetchForm">
                    <option disabled value=""> Select a State</option>
                    {data.states.map((state, index) => (
                        <option key={index} value={state.name}>
                        {state.name} ({state.abbreviation})
                        </option>
                    ))}
                </select>
                {errors.state && errors.state.message !== "" && errors.state.type === "required"}
                

                {/*Button on click start*/}
                {/*********************/}
                <button onClick= { () => {
                getValues("name") === '' ? 
                toast.error('Please enter in a name.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;

                getValues("email") === '' ? 
                toast.error('Please enter in an email address.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;

                getValues("occupation") === '' ? 
                toast.error('Please select an occupation.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;

                getValues("state") === '' ? 
                toast.error('Please select a state.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;

                getValues("password") === '' ? 
                toast.error('Please enter in a password.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;

                getValues("password_check") === '' ? 
                toast.error('Please enter in a verified password.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;

                !getValues("password").match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$") ? 
                toast.error('Please enter in a valid password.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;

                getValues("password_check") !== getValues("password") ? 
                toast.error("Passwords don't match", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;

                !getValues("email").match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") && 
                getValues("email") !== '' ? 
                toast.error('Please enter in a valid email address.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;

                getValues("password").match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$") && getValues("email").match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") && getValues("password") !== '' && getValues("password_check") !== '' 
                &&  getValues("email") !== '' && getValues("name") !== '' &&  getValues("password_check") === getValues("password") && getValues("state") !== ''
                && getValues("occupation") !== '' ? 
                toast.success('Your Message was sent.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                :
                null;
                }}
                type= "submit" className="bg-yellow-400/80 py-5 px-10 rounded-md text-black font-bold hover:bg-yellow-400"> Submit</button>
                {/*Button on click end*/}
                {/*********************/}

            </form>
            <ToastContainer 
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"/>
        </div>
    )
}

export const getStaticProps = async() => {
    const res = await fetch("https://frontend-take-home.fetchrewards.com/form");
    const data = await res.json();
    return {
        props: {
            data
        }
    } 
}