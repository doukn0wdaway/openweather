export function degreesToDirection(degrees: number) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  const normalizedDegrees = ((degrees % 360) + 360) % 360;

  const index = Math.floor((normalizedDegrees + 22.5) / 45) % 8;

  return directions[index];
}
