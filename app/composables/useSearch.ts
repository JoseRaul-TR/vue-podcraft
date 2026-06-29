// app/composables/useSearch.ts
export const useSearch = () => {
  // useState instead of ref — persists between navigation in the same session
  const searchTerm = useState<string>("search-term", () => "technology");
  return { searchTerm };
};
