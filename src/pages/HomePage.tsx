import { ListView } from "../components/ListView";

export const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis listas Top 5</h1>
      <ListView />
    </div>
  );
};
