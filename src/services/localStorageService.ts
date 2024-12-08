export enum LocalStorageKeys {
  CITIES = 'cities',
}

export const ls = {
  setItem: (key: LocalStorageKeys, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: LocalStorageKeys) => {
    localStorage.removeItem(key);
  },
  getItem: (key: LocalStorageKeys) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
};
