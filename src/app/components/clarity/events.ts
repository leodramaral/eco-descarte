import { useClarityContext } from '../ClarityProvider';

export interface ClarityEvents {
  auth_login_success: (userId: string, phone: string) => void;
  auth_login_failed: (phone: string, reason: string) => void;
  auth_register_success: (userId: string, phone: string) => void;
  auth_logout: (userId: string) => void;
  item_publish_success: (itemId: string, category: string, itemType: 'doacao' | 'pago') => void;
  contact_whatsapp_click: (itemId: string, sellerId: string) => void;
  page_view_home: () => void;
  page_view_item_detail: (itemId: string, category: string) => void;
  catalog_search: (query: string, resultCount: number) => void;
  catalog_filter_category: (category: string) => void;
  catalog_item_click: (itemId: string, position: number) => void;
  item_profile_click: (itemId: string, sellerId: string) => void;
  profile_tab_change: (tab: 'descartando' | 'historico' | 'conquistas') => void;
  catalog_view_mode_change: (mode: 'grid' | 'list') => void;
  item_detail_view: (itemId: string) => void;
}

export const useClarityEvents = (): ClarityEvents => {
  const { trackEvent } = useClarityContext();

  const validateEvent = (eventName: string, data: Record<string, any>): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Clarity Event] ${eventName}`, data);
    }
  };

  const auth_login_success = (userId: string, phone: string): void => {
    const data = { userId, phone: phone.slice(-4) };
    validateEvent('auth_login_success', data);
    trackEvent('auth_login_success', JSON.stringify(data));
  };

  const auth_login_failed = (phone: string, reason: string): void => {
    const data = { phone: phone.slice(-4), reason };
    validateEvent('auth_login_failed', data);
    trackEvent('auth_login_failed', JSON.stringify(data));
  };

  const auth_register_success = (userId: string, phone: string): void => {
    const data = { userId, phone: phone.slice(-4) };
    validateEvent('auth_register_success', data);
    trackEvent('auth_register_success', JSON.stringify(data));
  };

  const auth_logout = (userId: string): void => {
    const data = { userId };
    validateEvent('auth_logout', data);
    trackEvent('auth_logout', JSON.stringify(data));
  };

  const item_publish_success = (itemId: string, category: string, itemType: 'doacao' | 'pago'): void => {
    const data = { itemId, category, itemType };
    validateEvent('item_publish_success', data);
    trackEvent('item_publish_success', JSON.stringify(data));
  };

  const contact_whatsapp_click = (itemId: string, sellerId: string): void => {
    const data = { itemId, sellerId };
    validateEvent('contact_whatsapp_click', data);
    trackEvent('contact_whatsapp_click', JSON.stringify(data));
  };

  const page_view_home = (): void => {
    validateEvent('page_view_home', {});
    trackEvent('page_view_home');
  };

  const page_view_item_detail = (itemId: string, category: string): void => {
    const data = { itemId, category };
    validateEvent('page_view_item_detail', data);
    trackEvent('page_view_item_detail', JSON.stringify(data));
  };

  const catalog_search = (query: string, resultCount: number): void => {
    const data = { query, resultCount };
    validateEvent('catalog_search', data);
    trackEvent('catalog_search', JSON.stringify(data));
  };

  const catalog_filter_category = (category: string): void => {
    const data = { category };
    validateEvent('catalog_filter_category', data);
    trackEvent('catalog_filter_category', JSON.stringify(data));
  };

  const catalog_item_click = (itemId: string, position: number): void => {
    const data = { itemId, position };
    validateEvent('catalog_item_click', data);
    trackEvent('catalog_item_click', JSON.stringify(data));
  };

  const item_profile_click = (itemId: string, sellerId: string): void => {
    const data = { itemId, sellerId };
    validateEvent('item_profile_click', data);
    trackEvent('item_profile_click', JSON.stringify(data));
  };

  const profile_tab_change = (tab: 'descartando' | 'historico' | 'conquistas'): void => {
    const data = { tab };
    validateEvent('profile_tab_change', data);
    trackEvent('profile_tab_change', JSON.stringify(data));
  };

  const catalog_view_mode_change = (mode: 'grid' | 'list'): void => {
    const data = { mode };
    validateEvent('catalog_view_mode_change', data);
    trackEvent('catalog_view_mode_change', JSON.stringify(data));
  };

  const item_detail_view = (itemId: string): void => {
    const data = { itemId };
    validateEvent('item_detail_view', data);
    trackEvent('item_detail_view', JSON.stringify(data));
  };

  return {
    auth_login_success,
    auth_login_failed,
    auth_register_success,
    auth_logout,
    item_publish_success,
    contact_whatsapp_click,
    page_view_home,
    page_view_item_detail,
    catalog_search,
    catalog_filter_category,
    catalog_item_click,
    item_profile_click,
    profile_tab_change,
    catalog_view_mode_change,
    item_detail_view,
  };
};
