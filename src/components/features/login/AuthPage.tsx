'use client'

import useAuthAPI from "@/hooks/useAuthAPI";
import { AppStrings } from "@/lib/constants/AppStrings";
import { isValidatePhoneNumber } from "@/lib/utils";
import { IAuthInputField, IAuthOption } from "@/types";
import { useState } from "react";
import UserPhoneForm from "./UserPhoneForm";


const codeLength = (authInputs: IAuthInputField[]) => {
  return authInputs?.find((i) => i.type === "Code")?.codeLength;
};

export default function AuthPage() {
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

  const [isShowPrivacyPolicySheet, setIsShowPrivacyPolicySheet] =
    useState(false);

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

  const togglePrivacyPolicyBottomSheet = () => {
    setIsShowPrivacyPolicySheet(!isShowPrivacyPolicySheet);
  };

  return (
    <div>
      <div>
        <div>
          {/* Header */}

          {loginStep === 0 ? (

          <UserPhoneForm
          errorMessage={errorMessage}
          payloadLogin={payloadLogin}
          loadingStatus={loadingStatus}
          handleChangePhoneNumber={(text:string)=>handleChangeInputs("username",text)}
          handleSaveUsername={handleSaveUsername}
          />
          ) : authOptions?.length && loginStep === 1 ? (
            <p>Step2</p>
          ) : authSettings?.inputs && loginStep === 2 ? (
            <p>Step3</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
