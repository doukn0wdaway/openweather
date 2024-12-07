export const formTitle = (input: (string | undefined)[]) =>
  input.filter(e => e !== undefined).join(', ');
