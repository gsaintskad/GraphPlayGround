// components/NavigationBar/NavLink.tsx
'use client'; // Add this directive because we are using a hook

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // Import from next/navigation
import Link from 'next/link'; // Import from next/link

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  const pathname = usePathname(); // Use usePathname to get the current path

  const classes = pathname === to ? 'font-bold' : '';

  return (
    <Link href={to} className={classes}> {/* Use href instead of to */}
      {children}
    </Link>
  );
};

export default NavLink;