import { createContext, Dispatch, SetStateAction } from "react";

export const CommonContext = createContext<{
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}>({
  token: "",
  setToken: () => {},
});
