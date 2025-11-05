"use client";

import useAuthAPI, { validationInputs } from "@/hooks/useAuthAPI";
import { AppStrings } from "@/lib/constants/AppStrings";
import { isValidatePhoneNumber } from "@/lib/utils";
import { IAuthInputField, IAuthOption } from "@/types";
import { useEffect, useState } from "react";
import UserPhoneForm from "./UserPhoneForm";
import AuthOptions from "./AuthOptons";
import UserInfoForm from "./UserInfoForm";
import { error } from "console";
import { Icon } from "@iconify/react";
import Typography from "@/components/UI/Typography";
import { useRouter } from "next/navigation";

const codeLength = (authInputs: IAuthInputField[]) => {
  return authInputs?.find((i) => i.type === "Code")?.codeLength;
};

export default function AuthPage() {
  // ** ---------------- Hooks ------------------ ** //

  const router = useRouter();

  const {
    getAuthOptions,
    payloadLogin,
    setPayloadLogin,
    authOptions,
    setSelectedAuthOption,
    getAuthSettings,
    authSettings,
    verifyAuthentication,
    loginStep,
    isExpired,
    timeLeft,
    setTimeLeft,
    setIsExpired,
    handleReset,
    errorMessage,
    setErrorMessage,
    setLoginStep,
    setAuthSettings,
    setAuthOptions,
    loadingStatus,
  } = useAuthAPI();

  // ** -------------- Functions------------------- **//

  const handleSaveUsername = () => {
    console.log("username", payloadLogin?.username);
    if (
      !payloadLogin?.username ||
      !isValidatePhoneNumber(payloadLogin?.username)
    ) {
      setErrorMessage({
        message: AppStrings.login.usernameErrorMessage,
        name: "username",
      });
      return;
    }
    if (errorMessage?.name === "username") {
      setErrorMessage({
        message: "",
        name: "",
      });
    }
    getAuthOptions();
  };

  const handleSelectOption = (optionSelected: IAuthOption) => {
    getAuthSettings({
      username: payloadLogin?.username,
      tag: optionSelected?.tag,
    });
    setSelectedAuthOption(optionSelected);
  };

  const handleChangeInputs = (item: IAuthInputField, newValue: string) => {
    const inputValues = { ...payloadLogin.inputValues };
    inputValues[item.name] = newValue;

    setPayloadLogin({ ...payloadLogin, inputValues });
  };

  const handleGoToPreStep = (currentStep: number) => {
    if (currentStep === 2) {
      setAuthSettings(null);
      setPayloadLogin({ username: payloadLogin.username });
      setTimeLeft(0);
    }
    if (currentStep === 1) {
      setPayloadLogin(null);
      setAuthOptions(null);
    }
    setLoginStep(currentStep - 1);
  };

  const handleChangePhoneNumber = (text: string) => {
    console.log("text", text);
    setPayloadLogin({ ...payloadLogin, username: text });
  };

  const redirectToPrivacyPolicy = () => {
    router.push("/privacy-policy");
  };

  // ** ---------------- Effects ------------------ ** //

  useEffect(() => {
    console.log("payloadlogin", payloadLogin);
  }, [payloadLogin]);

  return (
    <div className='flex min-w-dvw min-h-dvh py-4 px-4'>
      <div className='w-full flex flex-col justify-start items-center gap-8'>
        <div className='w-full flex flex-row justify-start align-center'>
          <Icon
            icon='token:gymnet'
            className='text-primary'
            width='42'
            height='42'
          />
        </div>
        <div className='w-full flex justify-center items-center flex-col min-h-3/4'>
          {/* Header */}
          <div className='w-full flex justify-center items-center flex-row'>
            {loginStep === 0 ? (
              <UserPhoneForm
                errorMessage={errorMessage}
                payloadLogin={payloadLogin}
                loadingStatus={loadingStatus}
                handleChangePhoneNumber={handleChangePhoneNumber}
                handleSaveUsername={handleSaveUsername}
              />
            ) : authOptions?.length && loginStep === 1 ? (
              <AuthOptions
                handleReset={handleReset}
                handleGoToPreStep={handleGoToPreStep}
                authOptions={authOptions}
                handleSelectOption={handleSelectOption}
                loadingStatus={loadingStatus}
                errorMessage={errorMessage}
              />
            ) : authSettings?.inputs && loginStep === 2 ? (
              <UserInfoForm
                errorMessage={errorMessage}
                handleReset={handleReset}
                handleGoToPreStep={handleGoToPreStep}
                authSettings={authSettings}
                payloadLogin={payloadLogin}
                handleChangeInputs={handleChangeInputs}
                verifyAuthentication={verifyAuthentication}
                loadingStatus={loadingStatus}
                validationInputs={validationInputs}
                isExpired={isExpired}
                setIsExpired={setIsExpired}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
              />
            ) : null}
          </div>
          <div className='flex-wrap my-4 flex flex-row items-center justify-center px-2 max-w-sm md:max-w-lg'>
            <Typography type='body3' color='secondary'>
              {AppStrings.common.selectingTheLoginOptionConstitutesAcceptance}
            </Typography>

            <Typography
              type='body2'
              onClick={redirectToPrivacyPolicy}
              className='text-blue-600 underline decoration-blue-600 px-1'
            >
              {`${AppStrings.common.privacyPolicyANdTermsOfServices}`}
            </Typography>
            <Typography type='body3' color='secondary'>
              {AppStrings.common.is}.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
