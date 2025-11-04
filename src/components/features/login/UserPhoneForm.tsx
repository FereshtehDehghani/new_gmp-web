import { Button } from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import CustomInput from "@/components/UI/CustomInput";
import SectionTitle from "@/components/UI/SectionTitle";
import Typography from "@/components/UI/Typography";
import { AppStrings } from "@/lib/constants/AppStrings";
import { toPersianDigits } from "@/lib/utils";
import { Icon } from "@iconify/react";

const UserPhoneForm = () => {
  return (
    <Card>
      <div className='bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-md mx-auto mt-8 shadow-lg'>
        <div className='space-y-4'>
          <AnimatedErrorMessage
            message={errorMessage?.message}
            show={
              errorMessage?.message?.length > 0 &&
              errorMessage?.name === "username"
            }
          />

          <SectionTitle title={AppStrings.login.title} />
          <Typography type='h3' color='secondary'>
            {AppStrings.login.subtile}
          </Typography>
        </div>

        <div className='space-y-4 mt-4'>
          <CustomInput
            placeholder={toPersianDigits("09...")}
            keyboardType='phone-pad'
            value={payloadLogin?.username ?? ""}
            label={AppStrings.form.phone}
            error={errorMessage?.message}
            isError={errorMessage?.name === "username"}
            onChangeText={}
            maxLength={11}
            isRTL={false}
            icon={<Icon icon="fluent:phone-person-24-regular" width="24" height="24" />}
          />
        </div>

        <Button
          title={AppStrings.login.login}
          onClick={handleSaveUsername}
          isLoading={loadingStatus === "gettingOptions"}
          disabled={
            !payloadLogin?.username ||
            !isValidatePhoneNumber(payloadLogin?.username) ||
            loadingStatus === "gettingOptions"
          }
        />
      </div>
    </Card>
  );
};

export default UserPhoneForm;
