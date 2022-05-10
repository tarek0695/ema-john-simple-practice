import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

    return (

        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

            <input defaultValue={loggedInUser.displayName} {...register("name", { required: true })} placeholder='Your name'/>
            {errors.name && <span className='error'>name is required</span>}
            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder='Your email'/>
            {errors.email && <span className='error'>email is required</span>}
            <input {...register("address", { required: true })} placeholder='Your address'/>
            {errors.address && <span className='error'>address is required</span>}
            <input {...register("phone", { required: true })} placeholder='Your phone'/>
            {errors.phone && <span className='error'>phone is required</span>}
            <input type="submit" />

        </form>
    );
};

export default Shipment;