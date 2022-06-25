import React, { useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../../css/header.css';
import profile from '../imgrsr/profile.png';
import MenuIcon from '@mui/icons-material/Menu';
import useWindowDimensions from '../Hooks/useWindowDimensions';

function Header() {       
    const [dropdownActive, setDropdownActive] = useState(false);
    let userData = localStorage.getItem('CurrentUser');
    const [currentUser, setCurrentUser] = useState( userData ? JSON.parse(userData) : null);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);

    const name = () => { return `${currentUser.firstname} ${currentUser.lastname}`}

    function toggleDropdown() {
        setDropdownActive(!dropdownActive);
    }

    function hideDropdown() {
        setDropdownActive(false);
    }
    
    function logout(){
        const logoutConfirm = confirm("Are you sure you want to logout?");
        if(logoutConfirm){
            localStorage.removeItem('CurrentUser');
            window.location = '/'
        } 
    }
    
    function isLoggedIn() {
        if ( !currentUser ) {
            return <li><Link to='/login'>Login</Link></li>                        
        } else {
             return <li><img src={profile} alt="Profile" onClick={toggleDropdown} />
                <motion.div 
                style={{display: dropdownActive ? 'flex' : 'none' }} className="profile-dropdown"
                >
                    <h6>{name()}</h6>
                    <Link onClick={toggleDropdown} to='/settings'>Settings</Link>
                    <a onClick={logout} href="#">Logout</a>
                </motion.div>
            </li>
        }
    }

    function toggleMobileMenu() {
        setMobileMenuActive(!mobileMenuActive);
        isToggle()
        // if (mobileMenuActive) {
        //     return <div style={{width: '100vw', background: 'white'}}>
        //         <a href="/#title1-mission">Our Mission</a>
        //         <a href="/">Services</a>
        //         <Link to='/developers'>Developers</Link>
        //         <Link to="/contact">Contact</Link>
        //     </div>
        // } else {
        //     return null;
        // }
    }

    const [ on, setOn ] = useState(false);
    function isToggle() {
        setOn(prev => !prev)
    }

    function isMobile() {
        const { height, width } = useWindowDimensions();
        if (width < 768) {
            return <div>
                <h1 className='toggledMenuIcon'><MenuIcon style={{fontSize:'2rem'}} onClick={toggleMobileMenu}/></h1>
                {/* {toggleMobileMenu} */}
            </div>;
        } else {
            return <div>
                <ul>
                    <li><a onClick={hideDropdown} href="/#title1-mission">Our Mission</a></li><span>|</span>
                    <li><a onClick={hideDropdown} href="/">Services</a></li><span>|</span>
                    <li><Link onClick={hideDropdown} to='/developers'>Developers</Link></li><span>|</span>
                    <li><Link onClick={hideDropdown} to="/contact">Contact</Link></li><span>|</span>
                    {isLoggedIn()}  
                </ul>
            </div>
        }
    }

    return (
        <header className='header-nav'>
            <div id='logo-header'>
                <h1><Link to='/'>Kode<span className='ko'>Ko</span></Link></h1>
            </div>
            {isMobile()}
            
            <motion.div className='toggledMenu' 
            style={{width: '100vw', 
            display: mobileMenuActive ? 'flex' : 'none'}}
            animate={{ y: on ? [-100, 1000, 0] : [0, 0, 0] }}
            transition={{ type: "spring", stiffness: 100 }}
            >
                <a href="/#title1-mission">Our Mission</a>
                <a href="/">Services</a>
                <Link to='/developers'>Developers</Link>
                <Link to="/contact">Contact</Link>
            </motion.div>
        </header>
    )
}

export default Header;