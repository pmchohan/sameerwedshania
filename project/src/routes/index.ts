import { couple, events, guests } from '@/config/invitation.config';
import { assertValidConfig } from '@/config/validate';
import { buildRoutes } from './buildRoutes';

// Fail loudly at startup if the owner's config has a mistake.
assertValidConfig({ couple, events, guests });

export const routes = buildRoutes(guests);
