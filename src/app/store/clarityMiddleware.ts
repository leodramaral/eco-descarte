import { Middleware } from '@reduxjs/toolkit';
import { AppDataState, User, Item } from '../data/mockData';

interface ClarityWindow extends Window {
  clarity?: {
    (e: 'event', eventName: string, ...args: any[]): void;
  };
}

declare const window: ClarityWindow;

const trackClarityEvent = (eventName: string, data?: Record<string, any>) => {
  if (window.clarity) {
    const eventData = data ? JSON.stringify(data) : undefined;
    window.clarity('event', eventName, eventData);
  }
};

export const clarityMiddleware: Middleware<{}, { appData: AppDataState }> = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  const actionType = (action as { type: string }).type;

  switch (actionType) {
    case 'appData/loginByPhone': {
      const { currentUserId, users } = state.appData;
      const user = users.find((u: User) => u.id === currentUserId);
      const phone = (action as { payload: string }).payload;
      if (user) {
        trackClarityEvent('auth_login_success', {
          userId: user.id,
          phone: phone.slice(-4)
        });
      } else {
        trackClarityEvent('auth_login_failed', {
          phone: phone.slice(-4),
          reason: 'user_not_found'
        });
      }
      break;
    }

    case 'appData/logout': {
      const { currentUserId } = state.appData;
      if (currentUserId) {
        trackClarityEvent('auth_logout', { userId: currentUserId });
      }
      break;
    }

    case 'appData/createUser': {
      const { users } = state.appData;
      const payload = (action as { payload: { name: string; phone: string; photo?: string } }).payload;
      const normalizedPhone = payload.phone.replace(/\D/g, '');
      const newUser = users.find((u: User) => u.phone.replace(/\D/g, '') === normalizedPhone);
      if (newUser) {
        trackClarityEvent('auth_register_success', {
          userId: newUser.id,
          phone: newUser.phone.slice(-4)
        });
      }
      break;
    }

    case 'appData/addItem': {
      const item = (action as { payload: Item }).payload;
      trackClarityEvent('item_publish_success', {
        itemId: item.id,
        category: item.category,
        itemType: item.type
      });
      break;
    }

    case 'appData/setCurrentUser': {
      const userId = (action as { payload: string | null }).payload;
      if (userId) {
        trackClarityEvent('auth_login_success', { userId, phone: 'existing_session' });
      }
      break;
    }

    default:
      break;
  }

  return result;
};
