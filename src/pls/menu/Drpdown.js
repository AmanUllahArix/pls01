
import React from 'react'
import UsrItems from "./UsrItems" 

const Drpdown = ({ submenus, dropdown, depthLevel}) => {

    depthLevel = depthLevel + 1;
    
    const dropdownClass = depthLevel > 1 ? "dropdown-submenus" : "";

    return (
     <ul className={`dropdowns ${dropdownClass} ${dropdown ? "show" : ""}`}>
        
        {submenus.map((submenu, key) => (
                <>
                <UsrItems items={submenu} key={key} depthLevel={depthLevel} 
                   
                />
                {depthLevel > 1 ? <hr className="hrnew" ></hr> : null}
                </>
            ))}
     </ul>
    );
   };
   
   export default Drpdown;