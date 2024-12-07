export const formTitle = (input: (number | string | undefined)[]) =>
  input.filter(e => e !== undefined).join(', ');
