import React from 'react';
import styles from './ListSelector.mudule.css';

const ConfigSelector = ({ label, curList, curItem, setCurItem }) => {
 
  return (
    <div className="max-w-sm mx-auto">
      <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"> {label} </label>
      <select
        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
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