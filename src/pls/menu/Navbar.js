import React from 'react';
import { NavItem } from 'reactstrap';
import { faUserCog} from '@fortawesome/free-solid-svg-icons'
import MenuItems from "./MenuItms" 
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

var menuItems = [
    {
     title: "Preview",
     comp: "preview",
     shortc: "dabd"
    },
    {
        title: "Groups",
        comp: "groups",
        shortc: "dabd"
    },
    {
        title: "Screens",
        comp: "screens",
        shortc: "dabd"
    },
    {
        title: "Content",
        comp: "content",
        shortc: "dabd"
    },
   ];


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
     <>
      <div >
           <nav style={{ minWidth : "100%", minWidth : "100%"}}>
            <ul className="menus" >
              <NavItem > 
              <img style={{marginTop : 5}} src={`${window.location.origin}${process.env.REACT_APP_NAVBARLOGO}`} 
                   width="100px" className='logo' alt={process.env.REACT_APP_NAVBARLOGO}/>          
              </NavItem>
              {menuItems.map((menu, index) => {
                const depthLevel = 0;
              return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
              })}
              
                {usrMenu.map((menu, key) => {
                    const depthLevel = 0;
                    return <UsrItems items={menu} key={key} depthLevel={depthLevel}/>;
                  })}
            </ul>
          </nav>  
        
      </div>
         
        </>
     
    );
  }
}