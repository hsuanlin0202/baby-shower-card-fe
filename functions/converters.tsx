export const RemoveUndefinedFromObj = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  );
};

export const toLocalDateTimeString = (date: Date): string => {
  const temp = `${date.toLocaleDateString()} ${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

  return temp;
};

export const DateStringFormat = (date: string): string => {
  const tempDate = new Date(date);

  return `${tempDate.getFullYear()}-${
    tempDate.getMonth() < 9
      ? `0${tempDate.getMonth() + 1}`
      : tempDate.getMonth() + 1
  }-${tempDate.getDate() < 9 ? `0${tempDate.getDate()}` : tempDate.getDate()}`;
};
