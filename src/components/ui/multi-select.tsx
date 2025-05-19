'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { X, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  defaultValue?: string[];
  placeholder?: string;
  onChange?: (values: string[]) => void;
}

export function MultiSelect({
  options,
  defaultValue = [],
  placeholder = 'Select options',
  onChange,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = React.useCallback(
    (option: string) => {
      setSelected((prev) => {
        const newValue = prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option];
        onChange?.(newValue);
        return newValue;
      });
      inputRef.current?.focus();
    },
    [onChange]
  );

  const handleRemove = React.useCallback(
    (option: string) => {
      setSelected((prev) => {
        const newValue = prev.filter((item) => item !== option);
        onChange?.(newValue);
        return newValue;
      });
    },
    [onChange]
  );

  const filteredOptions = React.useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue]);

  return (
    <div ref={containerRef}>
      <Command className="overflow-visible bg-transparent" shouldFilter={false}>
        <div
          className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          onClick={() => {
            setOpen(true);
            inputRef.current?.focus();
          }}
        >
          <div className="flex flex-wrap gap-1">
            {selected.map((option) => {
              const label = options.find((o) => o.value === option)?.label;
              return (
                <Badge key={option} variant="secondary">
                  {label}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleRemove(option);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(option);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onFocus={() => setOpen(true)}
              placeholder={selected.length === 0 ? placeholder : undefined}
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && filteredOptions.length > 0 && (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const isSelected = selected.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className={`flex cursor-pointer items-center justify-between px-4 ${
                        isSelected ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      <div
                        className={`flex-1 ${isSelected ? 'font-medium' : ''}`}
                      >
                        {option.label}
                      </div>
                      {isSelected && (
                        <Check className="ml-2 h-4 w-4 text-primary" />
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          )}
        </div>
      </Command>
    </div>
  );
}
