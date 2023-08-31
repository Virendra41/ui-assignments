import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { REGISTERUSERDATA } from "../../Jotai/atomType";
import { ApiGet } from "../../helpers/API/ApiData";

export default function DefaultLayout({ children }) {
  const [, setRegisterUserData] = useAtom(REGISTERUSERDATA);
  useEffect(() => {
    ApiGet("users").then((res) => {
      setRegisterUserData(res.data);
    });
  }, []);
  return <>{children}</>;
}
