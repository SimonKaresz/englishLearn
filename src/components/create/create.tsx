import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { CategoryData } from "./category_data";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { iDatabase, iElementData } from "../category/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DataType {
  value: string;
  text: string;
}

export const Create = () => {
  const [user] = useAuthState(auth);
  const data: DataType[] = CategoryData;
  const [databaseName, setDatabaseName] = useState("any");

  const schema = yup.object().shape({
    hun: yup.string().required("Add meg a szó magyar jelentését!"),
    eng: yup.string().required("Add meg a szó angol jelentését!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iDatabase>({ resolver: yupResolver(schema) });

  const wordRef = collection(db, databaseName);

  const navigate = useNavigate();

  const onCreateWord = async (data: iDatabase) => {
    const category = databaseName;
    await addDoc(wordRef, {
      ...data,
      category,
      userId: user?.uid,
    });
    navigate("/category/" + category);
  };

  return (
    <div className="relative top-[60px] flex w-full flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onCreateWord)}
        className="mt-28 flex w-full flex-col items-center justify-center text-white"
      >
        <h1 className="text-2xl font-semibold text-green-500">
          Új szó hozzáadása
        </h1>
        <select
          onChange={(e) => {
            setDatabaseName(e.target.value);
          }}
          className="category_selector"
        >
          {data.map((data, index) => {
            return (
              <option
                key={index}
                className="bg-zinc-800 text-center font-semibold text-white"
                value={data.value}
              >
                {data.text}
              </option>
            );
          })}
        </select>
        <p className="text-red-500">{errors.hun?.message}</p>
        <textarea
          placeholder="magyar"
          className="my-12 w-[300px] resize-none border border-green-500 bg-transparent p-2 text-center focus:outline-none"
          {...register("hun")}
        ></textarea>
        <p className="text-red-500">{errors.eng?.message}</p>
        <textarea
          placeholder="angol"
          className="w-[300px] resize-none border border-green-500 bg-transparent p-2 text-center focus:outline-none"
          {...register("eng")}
        ></textarea>
        <input
          type="submit"
          className="mt-12 w-[300px] cursor-pointer border border-green-500 py-3 duration-200 ease-in-out hover:bg-green-500 active:bg-green-500"
          value="Hozzáadás"
        />
      </form>
    </div>
  );
};
