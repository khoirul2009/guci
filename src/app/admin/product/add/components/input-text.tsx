import { ChangeEvent, FC } from "react";

type Parameter = {
  value: any;
  onChange: any;
  label: string;
  name: string;
  type: string;
};

const InputText: FC<Parameter> = ({ value, onChange, label, name, type }) => {
  return (
    <>
      <label htmlFor="" className="label font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        className="w-full input input-bordered "
        placeholder="Type your text here..."
        value={value}
        id=""
        onChange={onChange}
      />
    </>
  );
};

export default InputText;
