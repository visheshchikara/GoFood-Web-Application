import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart'; // Adjust the path as necessary
import Modal from '../Modal';  // Adjust the path as necessary
import { useCallback } from 'react';
import { useCart } from './ContextReducer';



export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const handelLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                </li>
                : ""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/creatuser">SignUp</Link>

              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                  My Cart{" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)} > <Cart /> </Modal> : null}
                <div className='btn bg-white text-danger mx-2' onClick={handelLogout} >Logout</div>
              </div>

            }
          </div>
        </div>
      </nav>
    </div>
  )
}
