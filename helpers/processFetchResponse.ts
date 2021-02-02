export default function processFetchResponse(url: string) {
  return (response: Response) => {
    if (!response.ok) {
      throw new Error(`[HTTP ${response.status}] ${url}`);
    }
    return response.json();
  };
}
