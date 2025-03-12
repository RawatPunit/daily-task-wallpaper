
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ColorOption {
  value: string;
  label?: string;
}

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  colors: ColorOption[];
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  colors,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="text-sm font-medium text-ink-light">{label}</div>
      )}
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <motion.button
            key={color.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-8 h-8 rounded-full relative overflow-hidden",
              value === color.value && "ring-2 ring-primary ring-offset-2"
            )}
            style={{ background: color.value }}
            onClick={() => onChange(color.value)}
            aria-label={color.label || `Select color ${color.value}`}
          >
            {value === color.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
