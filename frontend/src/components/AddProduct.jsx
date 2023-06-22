import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isPriceInputFocused, setIsPriceInputFocused] = useState(false);
    const navigate = useNavigate();
    const saveProduct = async (e) => {
        e.preventDefault();
     
        if (!name) {
            window.alert('Please insert the product name');
            return;
        }
        if (!price) {
            window.alert('Please insert the price');
            return;
        }

        await axios.post("http://localhost:5000/products", {
            name: name,
            price: parseInt(price),
        })
        navigate("/")
    }

    const handlePriceInputFocus = () => {
        setIsPriceInputFocused(true);
    };

    const handlePriceInputBlur = () => {
        setIsPriceInputFocused(false);
    };

    return (
        <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
            <form onSubmit={saveProduct} className="my-10">
                <h2 className='font-medium text-center text-xl mb-5'>Add Product</h2>
                <div className="flex flex-col">
                    <div className="mb-5">
                        <label htmlFor="" className="font-bold text-slate-700">Product Name</label>
                        <input
                            type="text"
                            className="w-full py-3 mt-1 border bg-slate-100 border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder='Prouct Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="mb-5">
                        <label htmlFor="" className="font-bold text-slate-700">Price</label>
                        <div className={`w-full flex items-center border ${isPriceInputFocused ? 'border-slate-500' : 'border-slate-300'} rounded-lg `}>
                            <span className='flex-none text-slate-700 font-medium py-3 px-3 bg-slate-200 rounded-tl-lg rounded-bl-lg'>Rp.</span>
                            <input
                                type="text"
                                onFocus={handlePriceInputFocus}
                                onBlur={handlePriceInputBlur}
                                className="flex-1 px-2 py-3 bg-slate-100 rounded-tr-lg focus:outline-none rounded-br-lg"
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Save</button>
            </form>
        </div>
    )
}

export default AddProduct