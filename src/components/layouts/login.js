import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <nav className="hidden lg:inline nav-bar login">
            <ul className="flex">
                <li className="mr-5">
                    <Link to="/signin">
                        <button>
                            Giriş
                        </button>
                    </Link>  
                </li>
                <li>
                    <button>
                        Kayıt Ol
                    </button>            
                </li>
            </ul>
      </nav> 
    )
}
