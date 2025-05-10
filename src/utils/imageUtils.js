const images = import.meta.glob('../assets/*.{png,jpg,jpeg,gif,svg}', { eager: true });

export const getImageUrl = (name) => {
  const path = `../assets/${name}`;
  return images[path]?.default;
};
