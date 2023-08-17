import React, { useState } from 'react'
import '../popup.css';
import axios from 'axios';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({setAdmin}) {

    
    const navigate = useNavigate();
    const [seen, setSeen] = useState(false)

    //Function that toggles popup for login
    function togglePop () {
        setSeen(!seen);
    };

    //Passing password that entered from user and hashed in the backend. Then comparing with the real password 
    const login = async (pass) => {
        const url = `http://localhost:8080/password/`+pass;
        try{
        axios.get(url).then(response=>{
            if(response.data){
                setAdmin(response.data)
                console.log(response.data)
                toast.success(`Successfully Logged In`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition: Slide
                });
                navigate("/adminpanel")
            }
            toast.error('Wrong Password', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide
        });
            
        })
    }catch(error){
        console.log("hata baaa")
    }
    
    }
    
    function Login(props) {
        const [password, setPassword] = useState('')

        function handleLogin(e) {
            e.preventDefault()
            login(password)
            props.toggle()
        }
    
        return (
            <div className="popup">
                <div className="toast-container"><ToastContainer limit={2} /></div>
                <div className="popup-inner">
                    <h2>Admin Panel Login</h2>
                    <form onSubmit={handleLogin}>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                           
                        </label>
                        <button type="submit">Login</button>
                        <button className='btn btn-outline-danger' onClick={props.toggle}>Close</button>
                    </form>
                    
                </div>
            </div>
        )
    }


    return (
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="toast-container"><ToastContainer limit={2} /></div>
                <div className="container-fluid">
                    <a className="navbar-brand text-dark text-uppercase" href="/">
                        Vending Machine
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div>
                    <button className='btn btn-outline-dark' onClick={togglePop}>Admin Panel</button>
                    {seen ? <Login toggle={togglePop} /> : null}
                    </div>

                </div>
            </nav>

        </div>
    )
}
