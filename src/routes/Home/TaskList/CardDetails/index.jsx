import React, { useRef, useState } from "react";
import "./CardDetails.scss";
import { useAtom } from "jotai";
import moment from "moment";
import { REGISTERUSERDATA, TASKS } from "../../../../Jotai/atomType";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { taskStatus } from "../../../../../constant/enums";
import { ApiPut } from "../../../../helpers/API/ApiData";
import { toast } from "react-hot-toast";
export default function CardDetails({ item, setIsOpen, isOpen }) {
  const [dropdwon, setDropdwon] = useState(false);
  const [tasks, setTasks] = useAtom(TASKS);
  const modalRef = useRef();
  const dropdownRef = useRef();

  const classNameModal = isOpen ? "modal-wrapper show" : "modal-wrapper hide";
  const [users] = useAtom(REGISTERUSERDATA);
  const userInfo =
    localStorage.getItem("task-user-info") &&
    JSON.parse(localStorage.getItem("task-user-info"));
  let assignee = users?.find((user) => user.id === item?.assigneeId);
  let createdBy = users?.find((user) => user.id === item?.createdBy);
  useOnClickOutside(modalRef, () => setIsOpen(false));
  const statusList = Object.keys(taskStatus).filter(
    (obj) => taskStatus[obj].title !== item?.taskTitle
  );

  useOnClickOutside(dropdownRef, () => setDropdwon(false));

  const onChangeStatus = (record) => {
    ApiPut(`tasks/${item?.id}`, {
      ...item,
      taskTitle: taskStatus[record].title,
      taskStatus: taskStatus[record].value,
      updatedBy: userInfo?.id,
    })
      .then(() => {
        const taskData = tasks;
        let data = taskData[item?.taskTitle].find((obj) => obj.id === item?.id);
        taskData[item?.taskTitle] = taskData[item?.taskTitle].filter(
          (obj) => obj.id !== item?.id
        );
        data.taskTitle = taskStatus[record].title;
        data.taskStatus = taskStatus[record].value;
        data.updatedBy = userInfo?.id;

        tasks[taskStatus[record].title].push(item);
        setTasks({ ...taskData });
        toast.success("Status updated successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
    setDropdwon(false);
  };

  return (
    <div>
      <div className={classNameModal}>
        <div className="modal-md" ref={modalRef}>
          <div className="modal-header">
            <span>Task-{item?.id}</span>
            <i
              className="fa-solid fa-xmark"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            ></i>
          </div>
          <div className="modal-grid">
            <div className="modal-grid-items">
              <div className="details-information">
                <h4>{item?.title}</h4>
                <span>Description</span>
                <p>{item?.description}</p>
              </div>
            </div>
            <div className="modal-grid-items">
              <div className="relative-button" ref={dropdownRef}>
                <button onClick={() => setDropdwon(!dropdwon)}>
                  <span>{item?.taskTitle}</span>
                  <i class="fa-solid fa-chevron-down"></i>
                </button>

                <div className={dropdwon ? "dropdwon show" : "dropdwon hide"}>
                  {statusList?.map((record, index) => {
                    return (
                      <span key={index} onClick={() => onChangeStatus(record)}>
                        {taskStatus[record].title}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="details-text">
                <span>Details</span>
              </div>
              <div className="all-text-grid">
                {assignee && (
                  <div className="text-grid">
                    <div className="text-grid-items">
                      <span>Assignee :</span>
                    </div>
                    <div className="text-grid-items">
                      <div className="profile-text">
                        <div>{assignee?.userName?.charAt(0)}</div>
                        <a>{assignee?.userName}</a>
                      </div>
                    </div>
                  </div>
                )}
                <div className="text-grid">
                  <div className="text-grid-items">
                    <span>Start Date:</span>
                  </div>
                  <div className="text-grid-items">
                    <div className="profile-text">
                      <a>{moment(item?.startDate).format("MMM DD,YYYY")}</a>
                    </div>
                  </div>
                </div>
                <div className="text-grid">
                  <div className="text-grid-items">
                    <span>Due Date:</span>
                  </div>
                  <div className="text-grid-items">
                    <div className="profile-text">
                      <a>{moment(item?.dueDate).format("MMM DD,YYYY")}</a>
                    </div>
                  </div>
                </div>
                <div className="text-grid">
                  <div className="text-grid-items">
                    <span>Priority:</span>
                  </div>
                  <div className="text-grid-items">
                    <div className="profile-text">
                      <a>{item?.priorty}</a>
                    </div>
                  </div>
                </div>

                <div className="text-grid">
                  <div className="text-grid-items">
                    <span>Created By:</span>
                  </div>
                  <div className="text-grid-items">
                    <div className="profile-text">
                      <a>{createdBy?.userName}</a>
                    </div>
                  </div>
                </div>
                <div className="text-grid">
                  <div className="text-grid-items">
                    <span>Created At:</span>
                  </div>
                  <div className="text-grid-items">
                    <div className="profile-text">
                      <a>{moment(item?.createdAt).format("MMM DD,YYYY")}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
