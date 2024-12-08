export function getTemperatureColor(temp: number) {
  if (temp <= -15) return '#00A1E1'; // Холодно
  if (temp > -15 && temp <= 10) return '#66C2FF'; // Прохладно
  if (temp > 10 && temp <= 15) return '#A5D6A7'; // Умеренно
  if (temp > 15 && temp <= 20) return '#4CAF50'; // Нормально
  if (temp > 20 && temp <= 25) return '#FFC107'; // Тепло
  if (temp > 25 && temp <= 30) return '#FF9800'; // Жарко
  if (temp > 30 && temp <= 35) return '#FF5722'; // Очень жарко
  return '#D84315'; // Убийственно жарко
}
