const getRealData = (window: any, key: string) => {
  if (typeof window !== undefined) {
    const data = window.localStorage.getItem(key);
    return data;
  }
};

const setRealData = (
  window: any,
  key: string,
  data: JSON | Object | string
) => {
  if (typeof window !== undefined) {
    return window.localStorage.setItem(key, JSON.stringify(data));
  }
};

export default {
  get: getRealData,
  set: setRealData,
};
