import React,{Component} from 'react';
import {Link} from 'react-router-dom';



const Navigation = ()=>{
    return(
    
            <nav className={'deep-purple darken-1'}>
                <div className={"nav-wrapper"}>
                    <ul className={'left'}>
                        <li>
                            <Link to={'/'}>
                                <a className={'white-text'}>Inicio</a>
                            </Link>    
                        </li>
                        <li>
                            <Link to={'/about'}>
                                <a className={'white-text'}>Sobre</a>
                            </Link>
                       </li> 
                    </ul>
                </div>
               
                 
            </nav>
        
    );
}
export default Navigation;