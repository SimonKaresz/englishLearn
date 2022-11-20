import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { WordElement } from "./element";
import { iWordElement } from "./interface";

import { IoIosArrowRoundBack } from "react-icons/io";

export const GetWords = (props: string) => {
  const [wordList, setWordList] = useState<iWordElement[] | null>();
  const wordRef = collection(db, props);

  const getWords = async () => {
    const data = await getDocs(wordRef);
    setWordList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as iWordElement[]
    );
  };

  useEffect(() => {
    getWords();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wordList?.map((data, index) => (
          <WordElement element={data} key={index} />
        ))}
      </div>
      <div className="mt-12 flex w-full items-center justify-center">
        <Link
          to="/category"
          className="mx-4 flex w-[80px] items-center justify-center bg-red-400 text-center text-white"
        >
          <IoIosArrowRoundBack />
          <p>Vissza</p>
        </Link>
        <Link
          to="/create"
          className="flex w-[80px] items-center justify-center bg-green-400 text-center text-white"
        >
          <p>+ Szó</p>
        </Link>
      </div>
    </>
  );
};
