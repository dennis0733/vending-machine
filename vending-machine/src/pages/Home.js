import React, { useEffect, useState } from 'react'
import '../home.css'
import axios from 'axios'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {

    const [items, setItems] = useState([])
    const [totalmoney, setTotalmoney] = useState()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        loadItems()
        
    }, [])

    //Fetching Items from Backend
    const loadItems = async () => {

        const result = await axios.get("http://localhost:8080/items")

        setItems(result.data)

    }

    //Purchase process is completed over here. The price is dropped from users balance and added to owners vault.
    const buy = async (price,id) => {
        
        try {
            const url = `http://localhost:8080/updatemoney/${price}`;
            await axios.put(url).then(response => {
                setTotalmoney(response.data.totalmoney)
                setBalance(balance - price)
                toast.success(`Purchase completed successfully`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
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
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
            });
        }


    }

    //Adding balance for user via buttons
    function addBalance(e) {
        setBalance(balance + e)

        toast.success(`$${e} deposited successfully`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide
        });

    }

    //Cashout function for user after completing transcation
    function cashout() {
        setBalance(0);
        toast.success(`Cashout completed successfully`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide
        });
    }

    //function checks whether user have balance for buy an item or not . If user can function decreases quantity than  proceeds to purchase process(const buy)
    function buyItem(price,id,quantity) {
         
        if (price > balance) {
            toast.error('You have insufficient balance, try another product or deposit more', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
            });
            return 0;
        }
        else if (quantity<=0) {
            toast.error('Out Of Stock, Please Notify The Manager', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
            });
            return 0;
        }
        console.log(id)
        console.log(price)
        const url = `http://localhost:8080/updatequantity/${id}/${-1}`;

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
                console.log(response.data)
                loadItems()
            })


    

        

        buy(price)
    }

    return (

        <div className='container'>
            <div className="toast-container"><ToastContainer limit={2} /></div>
            <div className='py-4'>
                <section className="ftco-section bg-light">
                    <div className="container">
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-7 heading-section text-center ftco-animate fadeInUp ftco-animated">
                                <h2>Select Drink</h2>
                            </div>
                        </div>
                        <div className="row">
                            {
                                items.map((item) => (

                                    <div className="col-md-4 ftco-animate fadeInUp ftco-animated">
                                        <div className="block-7">
                                            <div ></div>
                                            <div className="text-center p-4">

                                                <img src={require(`../photos/${item.image}.png`)} width={250} height={250} alt="React Logo" />
                                                <span className="excerpt d-block">{item.name}</span>
                                                <span className="price"> <span className="number">{item.price}</span> </span>
                                                <ul className="pricing-text mb-5">
                                                    <li><span className="fa fa-check mr-2"></span>Quantity: {item.quantity}</li>
                                                </ul>
                                                <button className='btn btn-outline-dark' onClick={() => { buyItem(item.price,item.id,item.quantity) }}>Buy</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                </section>
                <div>
                    <div><h2>Balance:  ${balance}</h2></div>
                    <h2 >Deposit Money </h2>

                    <button className='btn btn-success ' style={{ margin: '10px' }} onClick={() => { addBalance(1) }} >$1</button>

                    <button className='btn btn-success' style={{ margin: '10px' }} onClick={() => { addBalance(5) }}>$5</button>

                    <button className='btn btn-success' style={{ margin: '10px' }} onClick={() => { addBalance(10) }}>$10</button>

                    <button className='btn btn-success' style={{ margin: '10px' }} onClick={() => { addBalance(20) }}>$20</button>
                </div>


            </div>

            <div>

                <button className='btn btn-danger' onClick={() => { cashout() }} >Cashout</button>

            </div>

        </div>
    )
}
