import { GetWords } from "../getWords";

export const Abroad = () => {
  return (
    <div className="relative top-[60px] flex w-full flex-col items-center justify-center py-12">
      <h1 className="mt-6 text-2xl font-semibold text-white">Külföld</h1>
      {GetWords("abroad")}
    </div>
  );
};
