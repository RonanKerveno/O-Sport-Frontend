// Composant gérant les controlleurs de type string du formulaire de profil utilisateur
/* eslint-disable react/require-default-props */

import {
  Control, Controller, RegisterOptions, FieldError, FieldValues, Path,
} from 'react-hook-form';

// Typage des props
interface UserTextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  rules: RegisterOptions<TFieldValues>;
  error?: FieldError;
  type?: string;
  disabled?: boolean;
}

export default function UserTextFieldForm<TFieldValues extends FieldValues>({
  control, name, label, rules, error, type, disabled,
}: UserTextFieldProps<TFieldValues>) {
  return (
    <div className="my-7">
      <label htmlFor={name} className="font-bold">
        {label} <span className="text-sm font-medium">(*Obligatoire)</span>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              type={type}
              className={`w-full px-2 py-1 border ${error ? 'border-red-600' : 'border-gray-300'} rounded mt-1 font-normal`}
              disabled={disabled}
            />
          )}
          rules={rules}
        />
        {error && <div className="text-red-600">{error.message}</div>}
      </label>
    </div>
  );
}
