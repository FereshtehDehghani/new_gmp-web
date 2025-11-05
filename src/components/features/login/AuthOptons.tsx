"use client";

import { motion, AnimatePresence } from "motion/react";
import SectionTitle from "@/components/UI/SectionTitle";
import ButtonOptionss from "./ButtonOptionss";
import AnimatedErrorMessage from "@/components/UI/AnimatedErrorMesssage";
import { Icon } from "@iconify/react";
import { AppStrings } from "@/lib/constants/AppStrings";

interface StepTwoCardProps {
  animatedAuthOptionsStyle?: any;
  errorMessage: {
    message: string;
    name: string;
  };
  handleReset: () => void;
  handleGoToPreStep: (step: number) => void;
  authOptions: any[];
  handleSelectOption: (option: any) => void;
  loadingStatus: string;
}

const AuthOptions: React.FC<StepTwoCardProps> = ({
  animatedAuthOptionsStyle,
  errorMessage,
  handleReset,
  handleGoToPreStep,
  authOptions,
  handleSelectOption,
  loadingStatus,
}) => {
  return (
    <motion.div
      className={`
        w-full max-w-md mx-auto
        bg-white rounded-2xl shadow-lg
        p-6 border border-gray-200
      `}
      style={animatedAuthOptionsStyle}
    >
      {/* Top Container */}
      <div className='mb-6'>
        <AnimatedErrorMessage
          message={errorMessage?.message}
          show={
            errorMessage?.message?.length > 0 && errorMessage?.name === "form"
          }
        />

        {/* Bottom Actions Container */}
        <div className='flex justify-between items-center mb-6'>
          <button
            onClick={handleReset}
            className='
              flex flex-row items-center justify-center
              px-1 gap-1
              text-blue-600 hover:text-blue-700
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
            '
          >
            <span className='text-sm font-medium text-center'>
              {AppStrings.login.editPhoneNumber}
            </span>
            <Icon icon='flowbite:edit-outline' width='24' height='24' />
          </button>

          <button
            onClick={() => handleGoToPreStep(1)}
            className='
              -mt-1
              flex flex-row items-center justify-center
              px-1 gap-1
              text-gray-700 hover:text-gray-900
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded
            '
          >
            <Icon
              icon='famicons:chevron-back-sharp'
              width='512'
              height='512'
              className='text-gray-700'
            />
          </button>
        </div>

        {/* Title */}
        <SectionTitle title={AppStrings.login.stepTwoTitle} />
      </div>

      {/* Auth Options */}
      <div>
        <ButtonOptionss
          authOptionsItems={authOptions ?? []}
          handleSelectOption={handleSelectOption}
          isLoading={loadingStatus === "gettingSetting"}
        />
      </div>
    </motion.div>
  );
};

export default AuthOptions;
