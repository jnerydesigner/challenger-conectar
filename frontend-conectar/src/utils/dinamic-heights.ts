export const DynamicHeights = (limitRegister: number) => {
  const limit = limitRegister + 2;
  const rowHeight = 48;
  const headerHeight = 56;
  const padding = 40;
  return headerHeight + rowHeight * limit + padding;
};
