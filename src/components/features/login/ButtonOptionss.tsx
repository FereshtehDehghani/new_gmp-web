'use client';

import { IAuthOption } from '@/types';
import { motion } from "motion/react"
import { useCallback, useState } from 'react';

interface IProps {
  authOptionsItems: IAuthOption[];
  isLoading: boolean;
  handleSelectOption: (selectedItem: IAuthOption) => void;
}

const ButtonOptionss: React.FC<IProps> = (props) => {
  const { authOptionsItems, handleSelectOption, isLoading } = props;

  const handlePress = useCallback((selectedItem: IAuthOption) => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    handleSelectOption(selectedItem);
  }, [handleSelectOption]);

  return (
    <div className="w-full flex flex-col gap-4">
      {authOptionsItems?.map((item, i) => (
        <motion.button
          key={`${item?.tag + i}`}
          disabled={isLoading}
          onClick={() => handlePress(item)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="
            w-full py-3 px-4 rounded-xl
            flex flex-row justify-center items-center
            bg-primary hover:bg-primary-light
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition-colors duration-200
          "
        >
          <span className="text-white font-medium text-base">
            {item.title}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default ButtonOptionss;