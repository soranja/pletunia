import React from 'react';
import { Link } from 'react-scroll';

interface LinkScrollProps {
  to: string;
  offset: number;
  children: React.ReactNode;
}

function LinkScroll({ to, offset, children }: LinkScrollProps) {
  return (
    <Link
      to={to}
      spy={true}
      smooth={true}
      offset={offset}
      duration={500}
      className="cursor-pointer"
    >
      {children}
    </Link>
  );
}

export default LinkScroll;
