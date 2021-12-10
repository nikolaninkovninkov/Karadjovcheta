import { useEffect } from 'react';

export default function useDebug<T>(dependency: T): void {
  useEffect(() => {
    console.log(dependency);
  }, [dependency]);
}
