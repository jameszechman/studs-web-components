import { aTimeout } from '@open-wc/testing';

export const awaitUntilAPIResponse = (el) => {
  let timer = 0;
  const loop = async () => {
    // maximum 5s
    if (timer < 50 && el && !el?._page) {
      await aTimeout(100);
      timer++;
      await loop();
    }
  };
  return loop;
};
