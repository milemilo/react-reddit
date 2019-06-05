import { arrayShuffle } from '../helpers';

test('array shuffle', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dupArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shuffledArray = arrayShuffle(dupArr);
  expect(JSON.stringify(shuffledArray)).not.toEqual(JSON.stringify(arr));
});
