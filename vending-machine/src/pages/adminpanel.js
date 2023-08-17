import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AdminPanel({ setAdmin }) {

    const [items, setItems] = useState([])
    const [totalmoney, setTotalmoney] = useState();
    const [price, setPrice] = useState({})
    const [quantity, setQuantity] = useState({})
    const [cashout, setCashout] = useState({});

    useEffect(() => {
        loadItems();
        loadMoney();
    }, []);

    useEffect(() => {
        console.log(totalmoney)
    }, [totalmoney]);

    //Fetching Items from Backend
    const loadItems = async () => {
        const result = await axios.get("http://localhost:8080/items")
        setItems(result.data);

    }
    //Fetching Total Money from Backend
    const loadMoney = async () => {
        const money = await axios.get("http://localhost:8080/totalmoney")
        setTotalmoney(money.data);
    }

    //Function for putting updated price
    function editPrice(id) {

       
        const url = `http://localhost:8080/updateprice/${id}/${price.target.value}`;

        axios.put(url)
            .then(response => {
                if (response.status === 200) {
                    toast.success("Successfully Changed", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        transition: Slide
                    });

                }

                loadItems()
            })


    }

    //Function for adding more items(increasing quantity)
    function editQuantity(id) {

        const url = `http://localhost:8080/updatequantity/${id}/${quantity.target.value}`;

        axios.put(url)
            .then(response => {
                toast.success("Successfully Changed", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition: Slide
                });

                loadItems()
            })


    }



    //Function for cashout for machine owner
    const putMoney = async () => {
        try {
            const url = `http://localhost:8080/updatemoney/${-cashout.target.value}`;
            await axios.put(url).then(response => {
                setTotalmoney(response.data.totalmoney)

                toast.success(`$${cashout.target.value} withdrawal successfully completed`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition: Slide
                });


            })

        } catch (error) {
            toast.error('An error occurred!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
            });
        }
    };




    const onPriceChange = (e) => {

        setPrice(e)

    }

    const onQuantityChange = (e) => {

        setQuantity(e)

    }

    const onCashout = (e) => {
        setCashout(e)

    }


    
    return (
        <div className='container'>
            <div className="toast-container"><ToastContainer limit={2} /></div>
            <div className='py-4'>
                <table class="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <img src={require(`../photos/${item.image}.png`)} width={100} height={100} alt="React Logo" />
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.quantity}</td>
                                    <div>
                                        <input
                                            type="number"
                                            min="1"
                                            name="price"
                                            placeholder='Edit Price'
                                            onChange={(e) => onPriceChange(e)}
                                            autoComplete="off"
                                        />

                                        <button className='btn btn-outline-primary' onClick={() => { editPrice(item.id) }} >Edit</button>
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            name="quantity"
                                            min="1"
                                            placeholder='Add Item'
                                            onChange={(e) => onQuantityChange(e)}
                                            autoComplete="off"
                                        />
                                        <button className='btn btn-outline-success' onClick={() => { editQuantity(item.id) }}>Add</button>
                                    </div>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <h2>Total Money: ${totalmoney} </h2>
                <div>
                    <input
                        type="number"
                        name="money"
                        placeholder='Enter Amount'
                        onChange={(e) => onCashout(e)}
                        autoComplete="off"
                    />

                    <button className='btn btn-success' onClick={() => putMoney()} >Collect</button>
                </div>
                <h2> </h2>
                <Link className='btn btn-danger' to="/" onClick={() => setAdmin(false)}  >Back To Menu</Link>
            </div>
        </div >
    )
}
