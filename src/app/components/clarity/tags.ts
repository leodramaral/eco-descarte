import { useClarityContext } from '../ClarityProvider';

export type UserStatus = 'logged_in' | 'guest';
export type ItemCategory = 'moveis' | 'geladeiras' | 'tvs' | 'eletrodomesticos' | 'outros';
export type ItemType = 'doacao' | 'pago';
export type ItemUrgent = 'true' | 'false';
export type ViewMode = 'grid' | 'list';
export type ProfileTab = 'descartando' | 'historico' | 'conquistas';

export interface ClarityTags {
  setUserStatus: (status: UserStatus) => void;
  setItemCategory: (category: ItemCategory) => void;
  setItemType: (type: ItemType) => void;
  setItemUrgent: (urgent: ItemUrgent) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setProfileTab: (tab: ProfileTab) => void;
  setCustomTag: (key: string, value: string) => void;
  removeTag: (key: string) => void;
  clearAllTags: () => void;
}

export const useClarityTags = (): ClarityTags => {
  const { setTag } = useClarityContext();

  const validateTagValue = (key: string, value: string): boolean => {
    if (!value || value.length === 0) {
      console.warn(`[Clarity Tag] Empty value for tag: ${key}`);
      return false;
    }
    return true;
  };

  const setUserStatus = (status: UserStatus): void => {
    if (validateTagValue('user_status', status)) {
      setTag('user_status', status);
    }
  };

  const setItemCategory = (category: ItemCategory): void => {
    if (validateTagValue('item_category', category)) {
      setTag('item_category', category);
    }
  };

  const setItemType = (type: ItemType): void => {
    if (validateTagValue('item_type', type)) {
      setTag('item_type', type);
    }
  };

  const setItemUrgent = (urgent: ItemUrgent): void => {
    if (validateTagValue('item_urgent', urgent)) {
      setTag('item_urgent', urgent);
    }
  };

  const setSearchQuery = (query: string): void => {
    const sanitizedQuery = query.trim().slice(0, 100);
    if (validateTagValue('search_query', sanitizedQuery)) {
      setTag('search_query', sanitizedQuery);
    }
  };

  const setViewMode = (mode: ViewMode): void => {
    if (validateTagValue('view_mode', mode)) {
      setTag('view_mode', mode);
    }
  };

  const setProfileTab = (tab: ProfileTab): void => {
    if (validateTagValue('profile_tab', tab)) {
      setTag('profile_tab', tab);
    }
  };

  const setCustomTag = (key: string, value: string): void => {
    const sanitizedKey = key.trim().slice(0, 50);
    const sanitizedValue = value.trim().slice(0, 100);
    
    if (validateTagValue(sanitizedKey, sanitizedValue)) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Clarity Tag] Custom tag set: ${sanitizedKey} = ${sanitizedValue}`);
      }
      setTag(sanitizedKey, sanitizedValue);
    }
  };

  const removeTag = (key: string): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Clarity Tag] Tag removed: ${key}`);
    }
    setTag(key, '');
  };

  const clearAllTags = (): void => {
    const tagsToRemove = [
      'user_status',
      'item_category',
      'item_type',
      'item_urgent',
      'search_query',
      'view_mode',
      'profile_tab'
    ];
    
    tagsToRemove.forEach(tag => removeTag(tag));
  };

  return {
    setUserStatus,
    setItemCategory,
    setItemType,
    setItemUrgent,
    setSearchQuery,
    setViewMode,
    setProfileTab,
    setCustomTag,
    removeTag,
    clearAllTags
  };
};
