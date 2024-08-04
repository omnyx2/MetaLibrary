export const setCache = (key, value, days = 30) => {
    const now = new Date();
    const expirationDate = now.getTime() + days * 24 * 60 * 60 * 1000;
    const data = { value, expirationDate };
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getCache = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
  
    const parsedData = JSON.parse(data);
    const now = new Date();
  
    if (now.getTime() > parsedData.expirationDate) {
      localStorage.removeItem(key);
      return null;
    }
  
    return parsedData.value;
  };
  