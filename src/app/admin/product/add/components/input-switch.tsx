type Parameter = {
  checked: boolean;
  onChange: any;
  label: string;
  name: string;
};

export default function InputSwitch({
  checked,
  onChange,
  label,
  name,
}: Parameter) {
  return (
    <div className="flex items-center my-3 space-x-3">
      <label htmlFor="" className="label font-medium">
        {label}
      </label>
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        className="toggle"
        checked={checked}
      />
    </div>
  );
}
