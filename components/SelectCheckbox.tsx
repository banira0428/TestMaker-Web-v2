import { useState } from "react";

type Props = {
  text: string;
  onChecked: (isChecked: boolean) => void;
};

export default function SelectCheckbox(props: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className={`block text-white ${
        checked ? "bg-accent" : "bg-primary"
      } p-3 rounded-md w-full mt-5 cursor-pointer`}
    >
      <input
        className="hidden"
        type="checkbox"
        onChange={(e) => {
          setChecked(e.target.checked);
          props.onChecked(e.target.checked);
        }}
      />
      {props.text}
    </label>
  );
}
