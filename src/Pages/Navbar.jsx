import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({token}) => {
  return (
    <div className='header'>
        <nav>
        <NavLink to='/'>Home</NavLink>
        { !token &&
        <NavLink to='/login'>Login</NavLink>
        }
        { !token &&
        <NavLink to='/register'>Register</NavLink>
        }
        <NavLink to='/routines'>Exercise Routines</NavLink>

        <NavLink to='/activities'>Workout Activities</NavLink>
        { token &&
        <NavLink to='/myroutines'>My Routines</NavLink>
        }
        { token &&
        <NavLink to='/logout'>Log Out</NavLink>
        }

        </nav>
    </div>
  );
};

export default Navbar;