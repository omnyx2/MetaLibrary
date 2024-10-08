import React from 'react';
import styles from './ListSelector.mudule.css';

const ConfigSelector = ({ label, curList, curItem, setCurItem }) => {
  return (
    <div className="inline-block w-auto h-auto">
      <label className=''></label>
      <label for="countries" className="relative block text-sm font-medium text-gray-900 dark:text-black"> {label} </label>
      <select
        className="absolute w-60 h-8 left-4 top-8 pl-2 outline-0 rounded-full bg-white text-black cursor-pointer transition duration-300 ease-in-out transition-all hover:bg-gray-200"
        // className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
        value={curItem}
        onChange={(e) => {
          // Redirect using Next.js's built-in Link component
          // This will navigate without a full page reload
          // Assuming 'e.target.value' is a valid page path
          setCurItem(e.target.value) // Keeping this for now, but consider using Next.js's Link component
        }}
      >
        {curList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConfigSelector;