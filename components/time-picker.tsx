import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  useSelect?: boolean; // Switch between Select and Input fields for hours and minutes
}

export function TimePicker({ value = "12:00 AM", onChange, useSelect = false }: TimePickerProps) {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  // Sync component state with external `value`
  useEffect(() => {
    if (value) {
      const [time, ampm] = value.split(" ");
      const [h, m] = time.split(":");
      setHour(h);
      setMinute(m);
      setPeriod(ampm);
    }
  }, [value]);

  // Update the formatted time when any part changes
  const handleTimeChange = () => {
    if (hour && minute) {
      const formattedTime = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} ${period}`;
      onChange && onChange(formattedTime);
    }
  };

  // Generate options for hours and minutes
  const hoursOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutesOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  return (
    <div className="flex space-x-2">
      {/* Hour - either Select or Input */}
      {useSelect ? (
        <Select value={hour} onValueChange={(val) => { setHour(val); handleTimeChange(); }}>
          <SelectTrigger className="w-16">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {hoursOptions.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          placeholder="HH"
          value={hour}
          onChange={(e) => {
            const val = e.target.value;
            if (/^(0?[1-9]|1[0-2])?$/.test(val)) { // Allow empty or valid input
              setHour(val);
              if (val) handleTimeChange(); // Only update if there's a valid value
            }
          }}
          maxLength={2}
          className="w-14 text-center"
        />
      )}

      {/* Minute - either Select or Input */}
      {useSelect ? (
        <Select value={minute} onValueChange={(val) => { setMinute(val); handleTimeChange(); }}>
          <SelectTrigger className="w-16">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {minutesOptions.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          placeholder="MM"
          value={minute}
          onChange={(e) => {
            const val = e.target.value;
            if (/^[0-5]?[0-9]?$/.test(val)) { // Allow empty or valid input
              setMinute(val);
              if (val) handleTimeChange(); // Only update if there's a valid value
            }
          }}
          maxLength={2}
          className="w-14 text-center"
        />
      )}

      {/* AM/PM Selector */}
      <Select value={period} onValueChange={(val) => { setPeriod(val); handleTimeChange(); }}>
        <SelectTrigger className="w-16">
          <SelectValue placeholder="AM/PM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
