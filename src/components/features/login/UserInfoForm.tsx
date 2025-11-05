"use client";

import AnimatedErrorMessage from "@/components/UI/AnimatedErrorMesssage";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import TimeLimitTimer from "@/components/UI/TimeLimitTimer";
import { AppStrings } from "@/lib/constants/AppStrings";
import { motion } from "framer-motion";
import { ChevronLeft, Edit } from "lucide-react";
import OTPInput from "react-otp-input";

interface AnimatedErrorMessageProps {
  message: string;
  show: boolean;
}

interface UserInfoFormProps {
  animatedAuthSettingsStyle?: any;
  errorMessage: {
    message: string;
    name: string;
  };
  handleReset: () => void;
  handleGoToPreStep: (step: number) => void;
  authSettings: {
    inputs: Array<{
      type: string;
      name: string;
      label: string;
      required?: boolean;
      desc?: string;
      codeLength?: number;
    }>;
  };
  payloadLogin: {
    username: string;
    inputValues: {
      code?: string;
      [key: string]: string | undefined;
    };
  };
  handleChangeInputs: (item: any, text: string) => void;
  verifyAuthentication: () => void;
  loadingStatus: string;
  validationInputs: (inputs: any, values: any) => any[];
  isExpired: boolean;
  setIsExpired: (expired: boolean) => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;

}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  animatedAuthSettingsStyle,
  errorMessage,
  handleReset,
  handleGoToPreStep,
  authSettings,
  payloadLogin,
  handleChangeInputs,
  verifyAuthentication,
  loadingStatus,
  validationInputs,
  isExpired,
  setIsExpired,
  timeLeft,
  setTimeLeft,
}) => {
  const codeLength = (inputs: any[]) => {
    const codeInput = inputs.find((input) => input.type === "Code");
    return codeInput?.codeLength || 6;
  };

  return (
    <motion.div
      className='
        w-full max-w-md mx-auto
        bg-white rounded-2xl shadow-lg
        p-6 border border-gray-200
        transition-all duration-300
      '
      style={animatedAuthSettingsStyle}
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
              group
              flex flex-row items-center justify-center
              px-1 gap-1
              text-blue-600 hover:text-blue-700
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg
              hover:scale-105
            '
          >
            <span className='text-sm font-medium text-center'>
              {AppStrings.login.editPhoneNumber}
            </span>
            <Edit
              size={18}
              className='text-blue-600 group-hover:scale-110 transition-transform'
            />
          </button>

          <button
            onClick={() => handleGoToPreStep(2)}
            className='
              group
              flex flex-row items-center justify-center
              px-1 gap-1
              text-gray-700 hover:text-gray-900
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-lg
              hover:scale-105
            '
          >
            <ChevronLeft
              size={20}
              className='text-gray-700 group-hover:scale-110 transition-transform'
            />
          </button>
        </div>
      </div>

      {/* Form Inputs */}
      {authSettings?.inputs?.length &&
        payloadLogin?.inputValues &&
        authSettings.inputs.map((item, i) => (
          <div key={item?.name ?? i} className='w-full mb-4'>
            {item.type === "Code" ? (
              <div className='space-y-4'>
                <p className='text-gray-600 text-sm text-center'>
                  {`کد ${codeLength(authSettings.inputs)} رقمی به شماره ${
                    payloadLogin.username
                  } ارسال شد.`}
                </p>

                <div className='space-y-2'>
                  <OTPInput
                    value={payloadLogin?.inputValues?.code ?? ""}
                    onChange={(otp: string) =>
                      handleChangeInputs(item, otp)}
                    numInputs={item?.codeLength ?? 6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                  {/* <OtpInput
                    numberOfDigits={item?.codeLength ?? 6}
                    focusColor='#000'
                    autoFocus={false}
                    hideStick={true}
                    placeholder=''
                    blurOnFilled={true}
                    disabled={false}
                    type='numeric'
                    secureTextEntry={false}
                    value={payloadLogin?.inputValues?.code ?? ""}
                    focusStickBlinkingDuration={500}
                    onFocus={() => console.log("Focused")}
                    onBlur={() => console.log("Blurred")}
                    onTextChange={(text: string) =>
                      handleChangeInputs(item, text)
                    }
                    onFilled={(text: string) => console.log(`OTP is ${text}`)}
                    textInputProps={{
                      accessibilityLabel: "One-Time Password",
                      autoFocus: true,
                    }}
                    theme={{
                      containerStyle: {
                        direction: "ltr",
                      },
                      pinCodeContainerStyle: {
                        width: item?.codeLength > 5 ? "40px" : "58px",
                        height: "48px",
                        marginInline: "2px",
                      },
                    }}
                  /> */}
                  {errorMessage?.name === "code" && (
                    <p className='text-red-500 text-xs text-center'>
                      {errorMessage?.message}
                    </p>
                  )}
                </div>
              </div>
            ) : item.type === "password" ? (
              <Input
                value={payloadLogin?.inputValues[item.name] ?? ""}
                label={item.label}
                required={item.required}
                description={item?.desc ?? ""}
                onChange={(e) => handleChangeInputs(item, e.target.value)}
                error={errorMessage?.message}
                isError={errorMessage?.name === item.name}
                placeholder={AppStrings.profile.password}
                onBlur={verifyAuthentication}
              />
            ) : (
              <Input
                placeholder={item.label}
                type={
                  item.name === "email" ? "email-address" : "default"
                }
                required={item.required}
                value={payloadLogin?.inputValues[item.name] ?? ""}
                label={item.label}
                description={item?.desc ?? ""}
                error={errorMessage?.message}
                isError={errorMessage?.name === item.name}
                onChange={(e) => handleChangeInputs(item, e.target.value)}
              />
            )}
          </div>
        ))}

      {/* Submit Button and Timer */}
      <div className='mt-4 space-y-4'>
        <Button
          onClick={verifyAuthentication}
          //   isLoading={loadingStatus === "veryfying"}
          disabled={
            validationInputs(authSettings?.inputs, payloadLogin?.inputValues)
              ?.length !== 0 || loadingStatus === "veryfying"
          }
        >
          {AppStrings.login.login}
        </Button>

        <TimeLimitTimer
          timeLimitMin={1}
          isExpired={isExpired}
          setIsExpired={setIsExpired}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
        />
      </div>
    </motion.div>
  );
};

export default UserInfoForm;
