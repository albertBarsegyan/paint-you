import { paperSize } from "../../constants/paper.ts";

export const paperSizeValidator = (value: number | string): number | null => {
  const stringValue = String(value).trim();

  if (stringValue === "") return null;

  if (!/^-?\d*\.?\d+$/.test(stringValue)) return null;

  const numberValue = Number(stringValue);

  if (numberValue >= paperSize.MAX_SIZE) {
    return paperSize.MAX_SIZE;
  }

  if (numberValue <= paperSize.MIN_SIZE) {
    return paperSize.MIN_SIZE;
  }

  return numberValue;
};
