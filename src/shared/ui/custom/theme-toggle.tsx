'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Button } from '../button';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      value: 'light',
      icon: <Sun className="size-6" />,
    },
    {
      value: 'dark',
      icon: <Moon className="size-6" />,
    },
  ];
  const [open, setOpen] = useState(false);
  const handleThemeChange = (value: string) => {
    console.log(`Changing theme to: ${value}`);
    setTheme(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9 w-9">
          {themes.find((t) => t.value === theme)?.icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-85 flex w-max flex-col gap-1 p-1">
        {themes.map((themeOption) => (
          <Button
            variant={'outline'}
            className="h-9 w-9"
            key={themeOption.value}
            onClick={() => {
              // console.log(`Button clicked for theme: ${themeOption.value}`);
              handleThemeChange(themeOption.value);
            }}
          >
            {themeOption.icon}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
