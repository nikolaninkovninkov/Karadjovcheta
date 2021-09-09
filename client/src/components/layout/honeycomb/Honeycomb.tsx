import React, { ReactNode } from 'react';

export default function Honeycomb({ children }: { children: ReactNode }) {
  return <div className='honeycomb'>{children}</div>;
}
