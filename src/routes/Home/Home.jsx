import React, { useEffect, useRef, useState } from "react";
import "./home.scss";
import { useAtom } from "jotai";
import { TASKS } from "../../Jotai/atomType";
import { ApiGet } from "../../helpers/API/ApiData";
import TaskList from "./TaskList";
import CreateTicket from "./CreateTicket";
import { priorty, taskStatus } from "../../../constant/enums";
import { autoLogoutHandler } from "../../helpers/commonHelpers";
import useOnClickOutside from "../../hooks/useOnClickOutside";
export default function Home() {
  const [, setTasks] = useAtom(TASKS);
  const userInfo =
    localStorage.getItem("task-user-info") &&
    JSON.parse(localStorage.getItem("task-user-info"));
  const dropdownRef = useRef();
  const [dropdwon, setDropdwon] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(true);

  useOnClickOutside(dropdownRef, () => setDropdwon(false));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setLoader(true);
    ApiGet("tasks")
      .then((res) => {
        let data = res.data?.filter(
          (item) =>
            item?.assigneeId === userInfo?.id ||
            userInfo?.id === item?.createdBy ||
            userInfo?.id === item?.updatedBy
        );
        let groupByTaskStatus = data.reduce((r, a) => {
          r[a.taskTitle] = [...(r[a.taskTitle] || []), a];
          return r;
        }, {});
        if (Object.keys(groupByTaskStatus).length !== 3) {
          Object.keys(taskStatus).forEach((item) => {
            if (!groupByTaskStatus[taskStatus[item].title]) {
              groupByTaskStatus[taskStatus[item].title] = [];
            }
          });
        }
        groupByTaskStatus = {
          [taskStatus.toDo.title]: groupByTaskStatus[taskStatus.toDo.title],
          [taskStatus.inProgress.title]:
            groupByTaskStatus[taskStatus.inProgress.title],
          [taskStatus.done.title]: groupByTaskStatus[taskStatus.done.title],
        };

        setTasks(groupByTaskStatus);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  const fetchFirstLetter = () => {
    return userInfo?.userName?.charAt(0);
  };

  return (
    <div>
      <div className="home-page-all-contnet-alignment">
        {!loader && (
          <div className="container">
            <div className="title">
              <h1>
                <span>Task</span> Board
              </h1>
              <div className="all-button-alignment">
                <button onClick={() => setIsOpen(true)}>Create Task</button>
                <div className="relative-button" ref={dropdownRef}>
                  <div
                    onClick={() => setDropdwon(!dropdwon)}
                    className="profile-name"
                  >
                    {fetchFirstLetter()}
                  </div>

                  <div className={dropdwon ? "dropdwon show" : "dropdwon hide"}>
                    <span onClick={() => autoLogoutHandler()}>Logout</span>
                  </div>
                </div>
              </div>
            </div>
            <TaskList />
          </div>
        )}
      </div>
      <CreateTicket
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        item={{ priorty: priorty.Minor }}
      />
    </div>
  );
}
