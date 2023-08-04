import { BASE_URL } from '../helpers/common';

export const handleFetch = async (endpoint: string): Promise<any> =>
  await fetch(BASE_URL + endpoint)
    .then(response => response.json())
    .then(data => data);
