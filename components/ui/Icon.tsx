import React, { useEffect, useRef } from 'react';

declare const lucide: any;

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && typeof lucide !== 'undefined') {
      const i = document.createElement('i');
      i.setAttribute('data-lucide', name);
      ref.current.innerHTML = '';
      ref.current.appendChild(i);
      lucide.createIcons({
        nodes: [i],
        attrs: {
          'class': 'w-full h-full' // The SVG will always fill its container
        }
      });
    }
  }, [name]); // Only re-run when the icon name changes

  return <div ref={ref} className={className} />;
};

export default Icon;
