import React, {ReactNode} from 'react';
import {Link, useLocation} from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: ReactNode;
}
const NavLink = ({to,children}:NavLinkProps) => {
  const location = useLocation();
  console.log(location);
  const classes=location.pathname===to?"font-bold":""
  return (
    <Link to={to} className={classes}>
      {children}

    </Link>
  );
};

export default NavLink;