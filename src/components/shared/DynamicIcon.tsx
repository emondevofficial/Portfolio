import React from 'react';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  // Normalize icon name
  const cleanName = name ? name.trim() : '';
  const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  
  // @ts-expect-error - dynamic indexing on Lucide icons map
  const IconComponent = Icons[formattedName] || Icons[cleanName] || Icons.Code;

  return <IconComponent {...props} />;
};
