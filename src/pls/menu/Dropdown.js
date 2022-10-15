
import React from 'react'
import MenuItems from "./MenuItms" 

const Dropdown = ({ submenus, dropdown, depthLevel}) => {

    depthLevel = depthLevel + 1;
    
    const dropdownClass = depthLevel > 1 ? "dropdown dropdown-submenu button" : "";

    return (
     <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
        
        {submenus.map((submenu, index) => (
                <>
                <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
                {depthLevel > 1 ? <hr className="hrnew" ></hr> : null}
                </>
            ))}
     </ul>
    );
   };
   
   export default Dropdown;