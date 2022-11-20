import { GetWords } from "../getWords";

export const Activity = () => {
  return (
    <div className="relative top-[60px] flex w-full flex-col items-center justify-center py-12 text-white">
      <h1 className="mt-6 text-2xl font-semibold text-white">Cselekvés</h1>
      {GetWords("activity")}
    </div>
  );
};
