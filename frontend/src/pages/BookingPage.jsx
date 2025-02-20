import React, { useState } from 'react'

const BookingPage = () =>{
    const [formData,setFormData] = useState({
        origin:"",
        destination:"",
        weight:"",
        date:"",
    });

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Booking Data:" , formData);
        alert("Booking Confirmed")
    }

    return(
        <div className='flex flex-col items-center justify-center min-h-screen bg-grey-100 p-6'>
            <h1 className='text-3xl font-bold mb-6'>
                Book Your Shipment
            </h1>
            <form onSubmit={handleSubmit} className='bg-grey p-6 rounded-lg w-full max-w-md'>
                <div className='mb-4'>
                    <label className='block font-medium'>Origin</label>
                    <input
                        type='text'
                        name='origin'
                        placeholder='Enter Origin'
                        value={formData.origin}
                        onChange={handleChange}
                        className='input input-bordered w-full'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-medium'>Destination</label>
                    <input
                        type='text'
                        name='destination'
                        placeholder='Enter Destination'
                        value={formData.destination}
                        onChange={handleChange}
                        className='input input-bordered w-full'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-medium'>Weight</label>
                    <input
                        type='number'
                        name='weight'
                        placeholder='Enter weight'
                        value={formData.weight}
                        onChange={handleChange}
                        className='input input-bordered w-full'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-medium'>Date</label>
                    <input
                        type='date'
                        name='date'
                        placeholder='Enter Date'
                        onChange={handleChange}
                        className='input input-bordered w-full'
                    />
                </div>
                <button type='submit' className='btn btn-primary w-full'>Confirm Booking</button>
            </form>
        </div>
    );
};

export default BookingPage;