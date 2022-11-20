import hunflag from "../../dist/image/hun_flag.png";
import engflag from "../../dist/image/eng_flag.png";

import { BsTrash, BsXLg } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { iProps, iSuccess } from "./interface";
import { useChangeLanguage, useSuccess } from "../toggle/toggle";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export const WordElement = (props: iProps) => {
  const [user] = useAuthState(auth);
  const { element } = props;
  /* const { state: isSuccess, success } = useSuccess(); */
  const { state: isEnglish, change } = useChangeLanguage();

  const [success, setSuccess] = useState<iSuccess[] | null>();
  const successRef = collection(db, "SUCCESS");
  const successDoc = query(successRef, where("elementId", "==", element.id));

  const getSuccess = async () => {
    const data = await getDocs(successDoc);
    setSuccess(
      data.docs.map((doc) => ({ userId: doc.data().userId, successId: doc.id }))
    );
  };

  const changeSuccess = async () => {
    try {
      const newDoc = await addDoc(successRef, {
        userId: user?.uid,
        elementId: element.id,
      });
      if (user) {
        setSuccess((prev) =>
          prev
            ? [...prev, { userId: user.uid, successId: newDoc.id }]
            : [{ userId: user.uid, successId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeSuccess = async () => {
    try {
      const successCancelQuery = query(
        successRef,
        where("elementId", "==", element.id),
        where("userId", "==", user?.uid)
      );

      const successCancelData = await getDocs(successCancelQuery);
      const successId = successCancelData.docs[0].id;

      const successCancel = doc(db, "SUCCESS", successId);
      await deleteDoc(successCancel);
      if (user) {
        setSuccess(
          (prev) =>
            prev && prev.filter((success) => success.successId !== successId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasSuccess = success?.find((success) => success.userId === user?.uid);

  const deleteWord = async () => {
    try {
      await deleteDoc(doc(db, element.category, element.id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSuccess();
  }, []);

  return (
    <>
      {user?.uid === element.userId || element.userId === "default" ? (
        <div
          className={
            !hasSuccess
              ? "mx-4 mt-12 flex w-[300px] flex-col items-center justify-center rounded-xl border border-green-500 py-3 text-white"
              : "mx-4 mt-12 flex w-[300px] flex-col items-center justify-center rounded-xl border border-green-500 bg-green-500/30 py-3 text-white"
          }
        >
          <div className="flex w-full items-center justify-end px-5">
            <img
              src={hunflag}
              alt={hunflag}
              onClick={change}
              className={
                !isEnglish
                  ? "collapse w-[30px] cursor-pointer opacity-[.7]  hover:opacity-[1] active:opacity-[1]"
                  : "visible w-[30px] cursor-pointer opacity-[.7]  hover:opacity-[1] active:opacity-[1]"
              }
            />
            <img
              src={engflag}
              alt={engflag}
              onClick={change}
              className={
                !isEnglish
                  ? "visible w-[30px] cursor-pointer opacity-[.7] hover:opacity-[1] active:opacity-[1]"
                  : "collapse w-[30px] cursor-pointer opacity-[.7] hover:opacity-[1] active:opacity-[1]"
              }
            />
          </div>
          <div
            className={
              isEnglish
                ? "visible flex h-[80px] flex-col items-center justify-around"
                : "collapse flex h-[80px] flex-col items-center justify-around"
            }
          >
            <p className="text-[12px] text-gray-300">magyar</p>
            <h1 className="break-words break-all text-3xl font-bold">
              {element.hun}
            </h1>
          </div>
          <div
            className={
              isEnglish
                ? "collapse flex h-[80px] flex-col items-center justify-around"
                : "visible flex h-[80px] flex-col items-center justify-around"
            }
          >
            <p className="text-[12px] text-gray-300">angol</p>
            <h1 className="break-words break-all text-3xl font-bold">
              {element.eng}
            </h1>
          </div>
          <div className="mt-2 flex w-full items-center justify-center">
            <BsTrash
              onClick={deleteWord}
              className="mx-12 cursor-pointer rounded-full bg-red-500/50 p-1 text-2xl hover:bg-red-500 active:bg-red-500"
            />
            <AiOutlineCheck
              onClick={changeSuccess}
              title="megtanulva"
              className={
                !hasSuccess
                  ? "visible mx-12 cursor-pointer rounded-full bg-green-600/50 p-1 text-2xl hover:bg-green-600 active:bg-green-600"
                  : "collapse mx-12 cursor-pointer rounded-full bg-green-600/50 p-1 text-2xl hover:bg-green-600 active:bg-green-600"
              }
            />
            <BsXLg
              onClick={removeSuccess}
              title="mégsem"
              className={
                !hasSuccess
                  ? "collapse mx-12 cursor-pointer rounded-full bg-red-500/50 p-1 text-2xl hover:bg-red-500 active:bg-red-500"
                  : "visible mx-12 cursor-pointer rounded-full bg-red-500/50 p-1 text-2xl hover:bg-red-500 active:bg-red-500"
              }
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
