import { Input, InputProps } from "../Input";

export interface ITextFieldProps {
  inputProps: InputProps;
  label: string;
}

const TextField = (props: ITextFieldProps) => {
  const { inputProps, label } = props;

  return (
    <div className='w-full flex flex-col gap-2 '>
      <p className='text-primary'>{label}</p>
      <Input {...inputProps} />
    </div>
  );
};

export default TextField;
