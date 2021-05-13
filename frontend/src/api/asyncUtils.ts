export const wait = async (timeToWaitMs: number) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, timeToWaitMs)
  );
};
