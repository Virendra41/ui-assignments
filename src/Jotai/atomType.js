import { atom } from "jotai";
import { taskStatus } from "../../constant/enums";

export const REGISTERUSERDATA = atom([]);
export const TASKS = atom({
  [taskStatus.toDo.title]: [],
  [taskStatus.inProgress.title]: [],
  [taskStatus.done.title]: [],
});
