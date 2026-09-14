import { useEffect, useState } from 'react';

import { useAuthStore } from '@/store/useAuthStore';

export function useAuthReady(): boolean {
  const [ready, setReady] = useState(() => useAuthStore.persist.hasHydrated());

  useEffect(() => {
    const mark = () => setReady(true);
    const unsub = useAuthStore.persist.onFinishHydration(mark);
    if (useAuthStore.persist.hasHydrated()) mark();
    const timeout = setTimeout(mark, 1500);
    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, []);

  return ready;
}
