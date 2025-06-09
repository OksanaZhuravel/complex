'use client';

import { cn } from '@/shared/lib/utils';
import { IMaskInput } from 'react-imask';

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

export const PhoneInput = ({ value, onChange, error }: PhoneInputProps) => {
  return (
    <div className="relative">
      <IMaskInput
        mask="+{7} (000) 000-00-00"
        lazy={false}
        unmask={true}
        value={value}
        onAccept={(val) => onChange(val)}
        className={cn(
          'w-full max-w-100 rounded-2xl border bg-background px-1 py-3 text-center text-4xl text-primary transition outline-none focus:ring-2 focus:ring-ring md:px-4 md:text-left',
          error ? 'border-red-500 bg-red-700 ring-red-300' : 'border-input'
        )}
        placeholder="+7(___)___ __-__"
      />
      {error && (
        <p className="absolute -top-5 left-0 mt-1 text-xs text-red-500">
          Введите корректный номер телефона
        </p>
      )}
    </div>
  );
};
