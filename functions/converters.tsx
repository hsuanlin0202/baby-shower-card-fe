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
