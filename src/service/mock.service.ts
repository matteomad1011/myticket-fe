const getRandomImage = (): string => {
  return `https://picsum.photos/seed/${Math.floor(
    Math.random() * 119
  )}/700/200`;
};

export const mockService = {
  getRandomImage,
};
