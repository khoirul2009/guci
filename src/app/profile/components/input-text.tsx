import { ChangeEvent, FC } from "react";

type Parameter = {
  value: any;
  onChange: any;
  label: string;
  name: string;
};

const InputText: FC<Parameter> = ({ value, onChange, label, name }) => {
  return (
    <>
      <label htmlFor="" className="label font-medium">
        {label}
      </label>
      <input
        type="text"
        name={name}
        className="w-full border-b-2 p-1 outline-none focus:border-primary transition duration-300 text-slate-500"
        placeholder="Type your name..."
        value={value}
        id=""
        onChange={onChange}
      />
    </>
  );
};

export default InputText;
