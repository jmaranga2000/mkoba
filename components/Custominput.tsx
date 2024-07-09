// components/Custominput.tsx

import React from 'react';
import { Controller } from 'react-hook-form';

interface CustomInputProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
}

const Custominput: React.FC<CustomInputProps> = ({ control, name, label, placeholder }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="form-item">
          <label className="form-label">{label}</label>
          <input {...field} placeholder={placeholder} className="form-input" />
        </div>
      )}
    />
  );
};

export default Custominput;
