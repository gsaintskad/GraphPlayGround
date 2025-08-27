import React, { useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/shadcnUI/select";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/DisplaySettings/actionCreator";
import { Language } from "@/redux/DisplaySettings/actionTypes";
import { Label } from "@radix-ui/react-label";
import { RootState } from "@/redux/store";
import { i18n } from "@/lib/i18n";

const LanguageSelect = () => {
  const dispatch = useDispatch();
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );

  const language = useMemo(
    () => i18n[displaySettings.language],
    [displaySettings.language],
  );
  return (
    <Select
      defaultValue="en"
      onValueChange={(l) => dispatch(setLanguage(l as Language))}>
      <SelectTrigger className="w-[180px]">
        <Label>{language.languageSelect.trigger}</Label>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{language.languageSelect.label}</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="de">Deutsch</SelectItem>
          <SelectItem value="ua">Українська</SelectItem>
          <SelectItem value="pl">Polski</SelectItem>
          <SelectItem value="ru">Русский</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSelect;