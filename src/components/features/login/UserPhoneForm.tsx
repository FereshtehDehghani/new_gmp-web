import AnimatedErrorMessage from "@/components/UI/AnimatedErrorMesssage";
import { Button } from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import CustomInput from "@/components/UI/CustomInput";
import SectionTitle from "@/components/UI/SectionTitle";
import Typography from "@/components/UI/Typography";
import { AppStrings } from "@/lib/constants/AppStrings";
import { isValidatePhoneNumber, toPersianDigits } from "@/lib/utils";
import { Icon } from "@iconify/react";

interface IUserPhoneFormProps {
  errorMessage: any;
  payloadLogin: any;
  loadingStatus: string;
  handleChangePhoneNumber: (text: string) => void;
  handleSaveUsername: () => void;
}

const UserPhoneForm: React.FC<IUserPhoneFormProps> = (props) => {
  const {
    errorMessage,
    payloadLogin,
    loadingStatus,
    handleChangePhoneNumber,
    handleSaveUsername,
  } = props;
  return (
    <div className='bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-md mx-auto mt-8 shadow-lg'>
      <div className='space-y-4'>
        <AnimatedErrorMessage
          message={errorMessage?.message}
          show={
            errorMessage?.message?.length > 0 &&
            errorMessage?.name === "username"
          }
        />

        <SectionTitle
          title={AppStrings.login.title}
          icon={
            <Icon icon='ant-design:login-outlined' className="text-primary" width='36' height='36' />
          }
        />
        <Typography type='body1' color='secondary'>
          {AppStrings.login.subtile}
        </Typography>
      </div>

      <div className='space-y-4 mt-4'>
        <CustomInput
          // placeholder={toPersianDigits("09...")}
          // keyboardType='phone-pad'
          value={payloadLogin?.username ?? ""}
          label={AppStrings.form.phone}
          errorMessage={errorMessage?.message}
          error={errorMessage?.name === "username"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);
            handleChangePhoneNumber(e.target.value);
          }}
         
        />

        <Button
          variant={"secondary"}
          onClick={handleSaveUsername}
          disabled={
            !payloadLogin?.username ||
            !isValidatePhoneNumber(payloadLogin?.username) ||
            loadingStatus === "gettingOptions"
          }
        >
          {loadingStatus === "gettingOptions"
            ? <span className="loading loading-infinity loading-lg text-white"></span>

            : AppStrings.login.login}
        </Button>
      </div>
    </div>
  );
};

export default UserPhoneForm;
