import { ListView } from "../components/ListView";

export const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Mis listas Top 5</h1>
      <ListView />
    </div>
  );
};
