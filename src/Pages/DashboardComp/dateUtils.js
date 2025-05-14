export const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const getCurrentMonth = () => {
  const currentMonthIndex = new Date().getMonth();
  return monthNames[currentMonthIndex];
};
