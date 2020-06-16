export const capitalize = (input: any): any => {
  if (input && typeof input === 'string') {
    return `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
  }
  return input || null;
};
