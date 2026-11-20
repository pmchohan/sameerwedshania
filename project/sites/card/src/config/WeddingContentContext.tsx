import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  couple as defaultCouple,
  events as defaultEvents,
  families as defaultFamilies,
  hosts as defaultHosts,
} from './invitation.config';
import type { Couple, EventKey, WeddingEvent } from './types';
import { fetchLiveWeddingDetails } from '@/services/invitationApi';

export interface WeddingContentData {
  couple: Couple;
  events: Record<EventKey, WeddingEvent>;
  families: typeof defaultFamilies;
  hosts: typeof defaultHosts;
}

const defaultContent: WeddingContentData = {
  couple: defaultCouple,
  events: defaultEvents,
  families: defaultFamilies,
  hosts: defaultHosts,
};

const WeddingContentContext = createContext<WeddingContentData>(defaultContent);

export function WeddingContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<WeddingContentData>(defaultContent);

  useEffect(() => {
    let active = true;
    fetchLiveWeddingDetails().then((live) => {
      if (!active || !live) return;

      setContent((prev) => ({
        couple: live.couple ? { ...prev.couple, ...live.couple } : prev.couple,
        events: live.events
          ? {
              ...prev.events,
              ...live.events,
            }
          : prev.events,
        families: live.families ? { ...prev.families, ...live.families } : prev.families,
        hosts: live.hosts && live.hosts.length > 0 ? live.hosts : prev.hosts,
      }));
    });

    return () => {
      active = false;
    };
  }, []);

  return <WeddingContentContext.Provider value={content}>{children}</WeddingContentContext.Provider>;
}

export function useWeddingContent(): WeddingContentData {
  return useContext(WeddingContentContext);
}
