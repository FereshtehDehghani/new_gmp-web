"use client";

import { motion, AnimatePresence } from "motion/react";
import ButtonOptionss from "./ButtonOptionss";
import AnimatedErrorMessage from "@/components/UI/AnimatedErrorMesssage";
import { Icon } from "@iconify/react";
import { AppStrings } from "@/lib/constants/AppStrings";
import Typography from "@/components/UI/Typography";

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
        py-6 px-4 border border-gray-200 
        sm:min-w-lg md:min-w-xl min-h-64
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
           gap-1
              text-primary hover:text-primary-light
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
              gap-1
              text-gray-700 hover:text-gray-900
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded
            '
          >
            <Icon
              icon='famicons:chevron-back-sharp'
              width='24'
              height='24'
              className='text-primary'
            />
          </button>
        </div>
      </div>

      {/* Auth Options */}
      <div className='mt-4 flex flex-col w-full gap-4'>
        <Typography type='body1'>{AppStrings.login.stepTwoTitle}</Typography>

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
