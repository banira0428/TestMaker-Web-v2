export const isSmartPhone = (userAgent: string): boolean => {
  const isMobile = userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone|Mobile|Opera Mini|IEMobile/i);
  return isMobile !== null;
}