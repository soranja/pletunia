import React from 'react';
import { Link } from 'react-scroll';

import { LinkScrollProps } from '@/types/props';

export const LinkScroll: React.FC<LinkScrollProps> = ({ to, offset, children }) => {
  return (
    <Link
      to={to}
      spy={true}
      smooth={true}
      offset={offset}
      duration={300}
      className="cursor-pointer"
    >
      {children}
    </Link>
  );
};
