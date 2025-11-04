// App.js
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  I18nManager,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { OtpInput } from "react-native-otp-entry";

import { SafeAreaView } from "react-native-safe-area-context";
import { IAuthInputField, IAuthOption } from "@/constants/types";
import { isValidatePhoneNumber, toPersianDigits } from "@/utils/helpers";
import AppStrings from "@/constants/AppStrings";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SectionTitle from "@/components/ui/SectionTitle";
import AuthOptions from "@/components/features/login/AuthOptions";
import CustomInput from "@/components/ui/CustomInput";
import Typography from "@/components/ui/Typography";
import GMPTextInput from "@/components/ui/GMPTextInput";
import Button from "@/components/ui/Button";
import useAuthAPI, { validationInputs } from "@/hooks/API-hooks/useAuthAPI";
import TimeLimitTimer from "@/components/features/login/TimeLimitTimer";
import PrivacyPolicy from "@/components/shared/PrivacyAndPolicy";
import { Colors } from "@/constants/Colors";
import AnimatedErrorMessage from "@/components/shared/AnimatedErrorMessage";
import GMPLogo from "@/components/shared/GMPLogo";
import StepIndicator from "@/components/shared/StepProgress";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  IS_LARGE_SCREEN,
  IS_WEB,
  MAX_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/utils/pixelScaling";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Force RTL for Persian
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const codeLength = (authInputs: IAuthInputField[]) => {
  return authInputs?.find((i) => i.type === "Code")?.codeLength;
};

export default function Authentication() {
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

  const windowWidth = Dimensions.get("window").width;
  const loginStep0TranslateX = useSharedValue(0);
  const loginStep1TranslateX = useSharedValue(windowWidth);
  const loginStep2TranslateX = useSharedValue(windowWidth);
  const checkTranslateX = useSharedValue(windowWidth);

  const [isShowPrivacyPolicySheet, setIsShowPrivacyPolicySheet] =
    useState(false);

  useEffect(() => {
    switch (loginStep) {
      case 0:
        loginStep0TranslateX.value = withTiming(0, { duration: 500 });
        loginStep1TranslateX.value = withTiming(windowWidth, { duration: 500 });
        loginStep2TranslateX.value = withTiming(windowWidth, { duration: 500 });
        break;
      case 1:
        loginStep0TranslateX.value = withTiming(-windowWidth, {
          duration: 500,
        });
        loginStep1TranslateX.value = withTiming(0, { duration: 500 });
        loginStep2TranslateX.value = withTiming(windowWidth, { duration: 500 });
        break;
      case 2:
        loginStep0TranslateX.value = withTiming(-windowWidth, {
          duration: 500,
        });
        loginStep1TranslateX.value = withTiming(-windowWidth, {
          duration: 500,
        });
        loginStep2TranslateX.value = withTiming(0, { duration: 500 });
        break;
      case 3:
        loginStep0TranslateX.value = withTiming(-windowWidth, {
          duration: 500,
        });
        loginStep1TranslateX.value = withTiming(-windowWidth, {
          duration: 500,
        });
        loginStep2TranslateX.value = withTiming(-windowWidth, {
          duration: 500,
        });
        checkTranslateX.value = withTiming(0, {
          duration: 500,
        });
        break;
      default:
        break;
    }
  }, [loginStep]);

  const animatedLoginStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: loginStep0TranslateX.value }],
    };
  });

  const animatedAuthOptionsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: loginStep1TranslateX.value }],
    };
  });

  const animatedAuthSettingsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: loginStep2TranslateX.value }],
    };
  });

  const animatedCheckStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: checkTranslateX.value }],
    };
  });

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
    console.log("inputValues", inputValues);
    console.log("payloadLogin", payloadLogin);

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
    <GestureHandlerRootView>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.background.primary }}
      >
        <View style={styles.container}>
          {/* Header */}

          <ImageBackground
            source={require("src/assets/images/login-bg.png")}
            resizeMode='cover'
            style={styles.image}
          />

          <View
            style={{
              width: "100%",
              justifyContent: "flex-end",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <GMPLogo />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            {loginStep !== 3 ? (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  paddingBottom: 8,
                  marginBottom:16
                }}
              >
                <StepIndicator currentStep={loginStep + 1} />
              </View>
            ) : null}
            <ScrollView
              contentContainerStyle={{ flexGrow: 1,paddingBottom:32 }}
              showsVerticalScrollIndicator={false}
            >
              <View>
                {loginStep === 0 ? (
                  <>
                    <Animated.View
                      style={[styles.stepOneCard, animatedLoginStyle]}
                    >
                      <View style={[styles.topContainer]}>
                        <AnimatedErrorMessage
                          message={errorMessage?.message}
                          show={
                            errorMessage?.message?.length > 0 &&
                            errorMessage?.name === "username"
                          }
                        />
                        {/* Title */}
                        <SectionTitle title={AppStrings.login.title} />
                        <Typography type='h3' color='secondary'>
                          {AppStrings.login.subtile}
                        </Typography>
                      </View>
                      <View style={{ gap: 16, width: "100%", marginTop: 16 }}>
                        {/* Phone Input */}
                        <CustomInput
                          placeholder={toPersianDigits("09...")}
                          keyboardType='phone-pad'
                          value={payloadLogin?.username ?? ""}
                          label={AppStrings.form.phone}
                          error={errorMessage?.message}
                          isError={errorMessage?.name === "username"}
                          onChangeText={(text) =>
                            setPayloadLogin({ username: text })
                          }
                          maxLength={11}
                          isRTL={false}
                          icon={
                            <Feather
                              name='phone'
                              size={20}
                              color={Colors.text.lightGrey}
                            />
                          }
                        />
                      </View>
                      <Button
                        title={AppStrings.login.login}
                        onPress={handleSaveUsername}
                        isLoading={loadingStatus === "gettingOptions"}
                        disabled={
                          !payloadLogin?.username ||
                          !isValidatePhoneNumber(payloadLogin?.username) ||
                          loadingStatus === "gettingOptions"
                        }
                      />

                      {/* Login Button */}
                    </Animated.View>
                  </>
                ) : authOptions?.length && loginStep === 1 ? (
                  <Animated.View
                    style={[styles.stepTwoCard, animatedAuthOptionsStyle]}
                  >
                    <View style={styles.topContainer}>
                      <AnimatedErrorMessage
                        message={errorMessage?.message}
                        show={
                          errorMessage?.message?.length > 0 &&
                          errorMessage?.name === "form"
                        }
                      />
                      <View style={styles.bottomActionsContainer}>
                        <Pressable
                          onPress={handleReset}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 4,
                            gap: 4,
                          }}
                        >
                          <Typography
                            type='body2'
                            color='primary'
                            align='center'
                          >
                            {AppStrings.login.editPhoneNumber}
                          </Typography>
                          <Feather name='edit' size={22} color='black' />
                        </Pressable>
                        <Pressable
                          onPress={() => handleGoToPreStep(1)}
                          style={{
                            marginTop: -4,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 4,
                            gap: 4,
                          }}
                        >
                          <Feather
                            name='chevron-left'
                            size={24}
                            color='black'
                          />
                        </Pressable>
                      </View>
                      {/* Title */}
                      <SectionTitle title={AppStrings.login.stepTwoTitle} />
                    </View>
                    <View>
                      <AuthOptions
                        authOptionsItems={authOptions ?? []}
                        handleSelectOption={handleSelectOption}
                        isLoading={loadingStatus === "gettingSetting"}
                      />
                    </View>
                  </Animated.View>
                ) : authSettings?.inputs && loginStep === 2 ? (
                  <Animated.View
                    style={[styles.stepThreeCard, animatedAuthSettingsStyle]}
                  >
                    <View style={styles.topContainer}>
                      {/* Title */}
                      <AnimatedErrorMessage
                        message={errorMessage?.message}
                        show={
                          errorMessage?.message?.length > 0 &&
                          errorMessage?.name === "form"
                        }
                      />
                      <View style={styles.bottomActionsContainer}>
                        <Pressable
                          onPress={handleReset}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 4,
                            gap: 4,
                          }}
                        >
                          <Typography
                            type='body2'
                            color='primary'
                            align='center'
                          >
                            {AppStrings.login.editPhoneNumber}
                          </Typography>
                          <Feather name='edit' size={22} color='black' />
                        </Pressable>

                        {/* Back */}
                        <Pressable
                          onPress={() => handleGoToPreStep(2)}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 4,
                            gap: 4,
                          }}
                        >
                          <Feather
                            name='chevron-left'
                            size={24}
                            color='black'
                          />
                        </Pressable>
                      </View>
                    </View>

                    {authSettings?.inputs?.length &&
                      payloadLogin?.inputValues &&
                      authSettings?.inputs?.map((item, i) => (
                        <View
                          key={item?.name ?? i}
                          style={{ minWidth: "100%" }}
                        >
                          {item.type === "Code" ? (
                            <View style={styles.otpContainer}>
                              <Typography type='body2' color='secondary'>
                                {`کد ${codeLength(
                                  authSettings?.inputs
                                )} رقمی به شماره ${
                                  payloadLogin?.username
                                } ${"ارسال شد."}`}
                              </Typography>

                              <View style={{ gap: 6 }}>
                                <OtpInput
                                  numberOfDigits={item?.codeLength ?? 7}
                                  focusColor='#000'
                                  autoFocus={false}
                                  hideStick={true}
                                  placeholder=''
                                  blurOnFilled={true}
                                  disabled={false}
                                  type='numeric'
                                  secureTextEntry={false}
                                  value={
                                    payloadLogin
                                      ? payloadLogin?.inputValues?.code ?? ""
                                      : null
                                  }
                                  focusStickBlinkingDuration={500}
                                  onFocus={() => console.log("Focused")}
                                  onBlur={() => console.log("Blurred")}
                                  onTextChange={(text) =>
                                    handleChangeInputs(item, text)
                                  }
                                  onFilled={(text) =>
                                    console.log(`OTP is ${text}`)
                                  }
                                  textInputProps={{
                                    accessibilityLabel: "One-Time Password",
                                    autoFocus: true,
                                  }}
                                  style={{
                                    fontFamily: "IRSans",
                                  }}
                                  theme={{
                                    containerStyle: {
                                      direction: "ltr",
                                    },
                                    pinCodeContainerStyle: {
                                      width:
                                        item?.codeLength > 5
                                          ? ((IS_LARGE_SCREEN
                                              ? MAX_WIDTH
                                              : SCREEN_WIDTH) -
                                              140) /
                                            (item?.codeLength ?? 6)
                                          : 58,
                                      height: 48,
                                      marginInline: 2,
                                    },
                                  }}
                                />
                                {errorMessage?.name === "code" ? (
                                  <Typography
                                    type='body3'
                                    color={"error"}
                                    align='center'
                                  >
                                    {errorMessage?.message}
                                  </Typography>
                                ) : null}
                              </View>
                            </View>
                          ) : item.type === "password" ? (
                            <GMPTextInput
                              value={
                                payloadLogin
                                  ? payloadLogin?.inputValues[item.name] ?? ""
                                  : ""
                              }
                              label={item.label}
                              // label={AppStrings.profile.password}
                              isRequired={item.required}
                              description={item?.desc ?? ""}
                              onChangeText={(text) =>
                                handleChangeInputs(item, text)
                              }
                              error={errorMessage?.message}
                              isError={errorMessage?.name === item.name}
                              isRTL
                              placeholder={AppStrings.profile.password}
                              keyboardType='default'
                              returnKeyType='done'
                              onEndEditing={verifyAuthentication}
                              secureTextEntry
                              onSubmitEditing={verifyAuthentication}
                            />
                          ) : (
                            <GMPTextInput
                              placeholder={item.label}
                              keyboardType={
                                item.name === "email"
                                  ? "email-address"
                                  : "default"
                              }
                              isRequired={item.required}
                              value={
                                payloadLogin
                                  ? payloadLogin?.inputValues[item.name] ?? ""
                                  : ""
                              }
                              label={item.label}
                              description={item?.desc ?? ""}
                              error={errorMessage?.message}
                              isError={errorMessage?.name === item.name}
                              onChangeText={(text) =>
                                handleChangeInputs(item, text)
                              }
                              isRTL
                            />
                          )}
                        </View>
                      ))}
                    <View style={{ marginTop: 16 }}>
                      <Button
                        title={AppStrings.login.login}
                        onPress={verifyAuthentication}
                        isLoading={loadingStatus === "veryfying"}
                        disabled={
                          validationInputs(
                            authSettings?.inputs,
                            payloadLogin?.inputValues
                          )?.length !== 0 || loadingStatus === "veryfying"
                        }
                      />

                      <TimeLimitTimer
                        timeLimitMin={1}
                        isExpired={isExpired}
                        setIsExpired={setIsExpired}
                        timeLeft={timeLeft}
                        setTimeLeft={setTimeLeft}
                      />
                    </View>
                    {/* Register */}
                  </Animated.View>
                ) : null}
              </View>
              {loginStep === 0 && !isShowPrivacyPolicySheet ? (
                <View style={styles.buttonTextContainer}>
                  <Typography type='body2' color='secondary' align='center'>
                    {
                      AppStrings.common
                        .selectingTheLoginOptionConstitutesAcceptance
                    }
                    <Typography
                      type='body1'
                      onPress={togglePrivacyPolicyBottomSheet}
                      style={{
                        color: Colors.info.main,
                        textDecorationStyle: "dashed",
                        textDecorationColor: Colors.info.main,
                        textDecorationLine: "underline",
                        paddingHorizontal: 4,
                      }}
                    >
                      {`${AppStrings.common.privacyPolicyANdTermsOfServices}`}
                    </Typography>
                    {AppStrings.common.is}
                  </Typography>
                </View>
              ) : null}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        {isShowPrivacyPolicySheet ? (
          <PrivacyPolicy
            isVisible={isShowPrivacyPolicySheet}
            handleCloseBottomSheet={togglePrivacyPolicyBottomSheet}
          />
        ) : null}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    writingDirection: "rtl",
    direction: "rtl",
    paddingHorizontal: 16,
    marginBottom: 0,
  },
  stepOneCard: {
    backgroundColor: Colors.background.default,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.cardStroke,
    width: "100%",
    minHeight: 400,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "5%",
    maxWidth: MAX_WIDTH,
    writingDirection: "rtl",
    gap: 32,
  },
  stepTwoCard: {
    backgroundColor: Colors.background.default,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.cardStroke,
    width: "100%",
    justifyContent: "flex-start",
    gap: 42,
    minHeight: 350,
     marginTop: "5%",
    maxWidth: MAX_WIDTH,
    writingDirection: "rtl",
  },

  stepThreeCard: {
    backgroundColor: Colors.background.default,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.cardStroke,
    width: "100%",
    minHeight: (Dimensions.get("screen").height * 2) / 6,
    justifyContent: "space-between",
    gap: 16,
    writingDirection: "rtl",
  },

  otpContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 12,
    writingDirection: "rtl",
    direction: "rtl",
    textAlign: "right",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#000",
  },

  input: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
    color: "#000",
  },
  hint: {
    fontSize: 12,
    color: "#ff6600",
    marginTop: 4,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#d57b32",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noAccount: {
    textAlign: "center",
    marginVertical: 12,
    color: "#555",
  },
  registerButton: {
    borderWidth: 1,
    borderColor: "#d57b32",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#d57b32",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    aspectRatio: 1,
  },
  topContainer: {
    gap: 18,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  bottomActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 16,
  },

  buttonTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    flexWrap: "wrap",
    gap: 4,
  },
});
