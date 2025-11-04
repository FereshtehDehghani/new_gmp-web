import {
  IAuthInputField,
  IAuthOption,
  IAuthSettingsPayload,
  IAuthSettingsResult,
} from "@/types";
import { useEffect, useState } from "react";
import APIEndPoints from "@/lib/constants/APIEndPoints";
import useAxios from "./useAxios";
import { useAuth } from "@/context/useAuth";
import { AppStrings } from "@/lib/constants/AppStrings";

export const validationInputs = (
  inputsSettings: IAuthInputField[],
  inputvalues: {
    [key: string]: string | number;
  }
) => {
  const itemsWithError: IAuthInputField[] = [];

  inputsSettings.forEach((i) => {
    if (i.required && !inputvalues[i.name]) {
      itemsWithError.push(i);
    }
  });

  console.log("itemsWithError", itemsWithError);
  return itemsWithError;
};

const useAuthAPI = () => {
  const [authOptions, setAuthOptions] = useState<IAuthOption[] | [] | null>(
    null
  );
  const [payloadLogin, setPayloadLogin] = useState<any>(null);

  const [selectedAuthOption, setSelectedAuthOption] =
    useState<IAuthOption | null>(null);
  const [authSettings, setAuthSettings] = useState<IAuthSettingsResult | null>(
    null
  );

  const [isVerifying, setIsVeryfying] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState<''|'gettingOptions'|"gettingSetting"|'veryfying'>("");

  const [userData, setUserData] = useState<any>(null);


  const [errorMessage, setErrorMessage] = useState({
    name: "",
    message: "",
  });

  const [isShowLottieCheck, setIsLottieCheck] = useState(false);

  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const [loginStep, setLoginStep] = useState(0);
  const axiosInstance = useAxios();
  const { login } = useAuth();

  const getAuthOptions = async () => {
    if (!payloadLogin?.username) return;
    setLoadingStatus("gettingOptions");

    try {
      const response = await axiosInstance.post(
        APIEndPoints.getAuthOptionsEndpoint,
        {
          username: payloadLogin?.username,
        }
      );
      console.log("response?.data", response?.data);
      if (response.data.success) {
        console.log("response?.data", response?.data);
        setAuthOptions(response?.data?.result);
        setLoginStep(1);
      }
    } catch (error) {
      // TODO  => SHOW Alert to user
      console.log("error in get auth options", error);
    } finally {
      console.log("getAuthOptions end");
    setLoadingStatus("");

    }
  };

  const getAuthSettings = async (payloadData: IAuthSettingsPayload) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!payloadData?.tag) return;
    setLoadingStatus("gettingSetting");
    try {
      const response = await axiosInstance.post(
        APIEndPoints.getAuthSettingsEndpoint,
        {
          ...payloadData,
        }
      );
      if (response.data.success) {
        console.log("Auth settings inputs", response.data?.result?.inputs);
        console.log("Auth settings inputs", response.data?.result?.timeLimit);

        setAuthSettings(response.data?.result);
        setPayloadLogin({ ...payloadData, inputValues: {} });
        setTimeLeft(response.data?.result?.timeLimit?.time * 60);
        setLoginStep(2);
      }
    } catch (error) {
      // TODO  => SHOW Alert to user
      console.log("error in get auth options", error);
    } finally {
      setLoadingStatus("");
    }
  };

  const verifyAuthentication = async () => {
    setLoadingStatus("veryfying");
    if (
      authSettings?.inputs &&
      validationInputs(authSettings?.inputs, payloadLogin?.inputValues)?.length
    ) {
      console.log(
        "validationInputs(authSettings?.inputs, payloadLogin?.inputValues)?.length",
        validationInputs(authSettings?.inputs, payloadLogin?.inputValues)
          ?.length
      );
      setErrorMessage({
        message: AppStrings?.login.inputValuesEmptyError,
        name: "form",
      });
      return;
    }
    setIsVeryfying(true);

    if (errorMessage?.message) {
      setErrorMessage({
        message: "",
        name: "",
      });
    }
    console.log(
      "validationInputs(authSettings?.inputs, payloadLogin?.inputValues)?.length"
    );

    try {
      const response = await axiosInstance.post(
        APIEndPoints.postAuthVerifyEndpoint,
        {
          ...payloadLogin,
        }
      );
      console.log("Auth verifyAuthentication response", response.data);

      if (response.data.success) {
        console.log("Auth verifyAuthentication response", response.data);
        const userData = response.data.result;
        setUserData(userData);
      } else {

        // Show message
        // dispatch(
        //   handleToggleAlertModal({
        //     isVisibleAlertModal: true,
        //     type: "warning",
        //     title: AppStrings.common.loginTitleError,
        //     message: [response.data?.messages[0]?.content],
        //     okayButtonTitle: AppStrings.common.iSee,
        //     cancelButtonTitle: AppStrings.common.cancelButtonTitle,
        //     isShowOkayButton: true,
        //     isShowCancelButton: false,
        //     handlePressOkayButton: () =>
        //       dispatch(
        //         handleToggleAlertModal({
        //           isVisibleAlertModal: false,
        //           type: "",
        //           title: "",
        //           message: [],
        //           okayButtonTitle: "",
        //           cancelButtonTitle: "",
        //           isShowOkayButton: false,
        //           isShowCancelButton: false,
        //         })
        //       ),
        //   })
        // );
      }
    } catch (error) {
      // TODO  => SHOW Alert to user
      console.log("error in get auth options", error);
    } finally {
      setIsVeryfying(false);
      setLoadingStatus("");
    }
  };

  useEffect(() => {
    if (
      authSettings?.timeLimit?.time &&
      authSettings?.timeLimit?.time > 0 &&
      isExpired &&
      !timeLeft
    ) {
      handleReset();
    }
  }, [authSettings?.timeLimit, isExpired, timeLeft]);

  // useEffect(() => {
  //   if (userData) {
  //     setLoginStep(3);
  //     setIsLottieCheck(true);
  //   }
  // }, [userData]);

  useEffect(() => {
    if (userData) {
    //   toast.success(AppStrings.common.welcome);
      setTimeout(() => {
        login(userData?.loginResult?.user, userData?.access_token);
      }, 2000);

      setTimeout(() => setIsLottieCheck(false), 5000);
    }
  }, [userData]);

  const handleReset = () => {
    setPayloadLogin(null);
    setAuthOptions(null);
    setAuthSettings(null);
    setLoginStep(0);
  };

  return {
    getAuthOptions,
    authOptions,
    setAuthOptions,
    setPayloadLogin,
    payloadLogin,
    getAuthSettings,
    verifyAuthentication,
    setSelectedAuthOption,
    selectedAuthOption,
    authSettings,
    setAuthSettings,
    handleReset,
    setLoginStep,
    loginStep,
    isExpired,
    timeLeft,
    setTimeLeft,
    setIsExpired,
    errorMessage,
    setErrorMessage,
    isShowLottieCheck,
    isVerifying,
    loadingStatus,
  };
};

export default useAuthAPI;
