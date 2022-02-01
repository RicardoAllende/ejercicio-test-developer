import { getCities, getCityById } from "./api/Service"

test('api returns registers by pageSize', async () => {
  const expectedPageSize = 10
  const cities = await getCities(1, expectedPageSize)
  expect(cities.pagination.pageSize).toEqual(expectedPageSize)
});

test('api returns registers by page', async () => {
  const expectedPage = 2
  const cities = await getCities(expectedPage)
  expect(cities.pagination.page).toEqual(expectedPage)
});

test('api returns city by id', async () => {
  const anExistentId = "5952983359954a0adbf7ab09"
  const cities = await getCityById(anExistentId)
  expect(cities._id).toEqual(anExistentId)
});
