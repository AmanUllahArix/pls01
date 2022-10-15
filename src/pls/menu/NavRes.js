

import React , {useState} from 'react';

import { faUserCog} from '@fortawesome/free-solid-svg-icons'
import UsrItems from "./UsrItems" 


var usrMenu = [
    {
        title : "User",
        icons: faUserCog,
        submenu : [
           {
              title: "Users",
              comp : "users"
           },
           {
              title: "Logout",
              comp : "logout"
           }   
        ]
       },
   ];

var usrMenu = [
    {
        title : "User",
        icons: faUserCog,
        submenu : [
           {
              title: "Users",
              comp : "users"
           },
           {
              title: "Logout",
              comp : "logout"
           }   
        ]
       },
   ];   

var menuItems = [
    {
     title: "Preview",
     comp: "/box/preview",
     shortc: "dabd"
    },
    {
        title: "Groups",
        comp: "/box/groups",
        shortc: "dabd"
    },
    {
        title: "Screens",
        comp: "/box/screens",
        shortc: "dabd"
    },
    
   ];


export default function NavRes() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    
    return (
      <nav className="navigation">
        <button className="hamburger" 
            onClick={() => {
            setIsNavExpanded(!isNavExpanded);
            }}>
          {/* icon from heroicons.com */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
       
        <img style={{marginTop : 5}} src={`${window.location.origin}${process.env.REACT_APP_NAVBARLOGO}`} 
                   width="100px" className='brand-name logo' alt={process.env.REACT_APP_NAVBARLOGO}/>          
        
        <div  className={
                isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                    }>
          <ul>
            {
                menuItems.map((t, key) => {
                    return (
                        <li key={key}>
                        <a href={t.comp}>{t.title}</a>
                      </li>            
                    )
                })
            }
          </ul>
        </div>
          <div>
            {usrMenu.map((menu, index) => {
                    const depthLevel = 0;
                    return <UsrItems items={menu} key={index} depthLevel={depthLevel}/>;
                  })}
        </div>  
      </nav>
    );
  }