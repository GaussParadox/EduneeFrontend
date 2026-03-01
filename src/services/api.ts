const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const apiFetch = async (
  endpoint: string,
  options?: RequestInit
) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
  console.error("Error backend:", data);
  throw new Error(JSON.stringify(data));
  }


  return data;
};
