import React from 'react';
import { Link } from 'react-scroll';

import { LinkScrollProps } from '@/types/props';

export const LinkScroll: React.FC<LinkScrollProps> = ({ to, offset, children, onAfterClick }) => {
  return (
    <Link
      to={to}
      spy
      smooth
      offset={offset}
      duration={300}
      className="cursor-pointer"
      onClick={() => onAfterClick?.()}
    >
      {children}
    </Link>
  );
};
