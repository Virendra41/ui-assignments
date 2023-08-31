import React, { useEffect } from "react";
import "./CreateTicket.scss";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { priorty, taskStatus } from "../../../../constant/enums";
import Input from "../../../components/HOC/Input";
import Textarea from "../../../components/HOC/Textarea";
import SelectInput from "../../../components/HOC/SelectInput/SelectInput";
import { useAtom } from "jotai";
import { REGISTERUSERDATA, TASKS } from "../../../Jotai/atomType";
import { ApiPost, ApiPut } from "../../../helpers/API/ApiData";
import { toast } from "react-hot-toast";
export default function CreateTicket({ isOpen, setIsOpen, item }) {
  const modalRef = React.useRef();
  const [inputValue, setInputValue] = React.useState({});
  const [users] = useAtom(REGISTERUSERDATA);
  const [tasks, setTasks] = useAtom(TASKS);
  const userInfo =
    localStorage.getItem("task-user-info") &&
    JSON.parse(localStorage.getItem("task-user-info"));
  const [errors, setErrors] = React.useState({});

  const className = isOpen
    ? "create-ticket-modal-wrapper show"
    : "create-ticket-modal-wrapper hide";

  useEffect(() => {
    setInputValue(
      item?.id
        ? { ...item }
        : {
            priorty: priorty.Minor,
          }
    );
  }, [item?.id, isOpen]);

  const handleInput = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    if (e.target.name === "startDate") {
      setInputValue({
        ...inputValue,
        [e.target.name]: e.target.value,
        dueDate: "",
      });
    } else {
      setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }
  };

  useOnClickOutside(modalRef, () => setIsOpen(false));

  const validateFrom = () => {
    let isValid = true;
    let error = {};
    if (!inputValue?.title) {
      isValid = false;
      error["title"] = "Please enter title";
    }
    if (!inputValue?.description) {
      isValid = false;
      error["description"] = "Please enter description";
    }
    if (!inputValue?.startDate) {
      isValid = false;
      error["startDate"] = "Please enter start date";
    }
    if (!inputValue?.dueDate) {
      isValid = false;
      error["dueDate"] = "Please enter due date";
    }
    if (!inputValue?.assigneeId) {
      isValid = false;
      error["assigneeId"] = "Please select assignee";
    }
    setErrors(error);
    return isValid;
  };

  const onSubmit = (e) => {
    e.stopPropagation();
    if (validateFrom()) {
      let payload = {
        ...inputValue,
        createdBy: inputValue?.id ? inputValue.createdBy : userInfo?.id,
        updatedBy: userInfo?.id,
        taskStatus: inputValue?.id
          ? inputValue.taskStatus
          : taskStatus.toDo.key,
        taskTitle: inputValue?.id
          ? inputValue.taskTitle
          : taskStatus.toDo.title,
        updatedAt: new Date(),
        createdAt: inputValue?.id ? inputValue.createdAt : new Date(),
      };
      if (inputValue?.id) {
        ApiPut("tasks/" + inputValue?.id, payload)
          .then((res) => {
            let taskData = tasks;
            let index = taskData[payload.taskTitle]?.findIndex(
              (obj) => obj.id === inputValue?.id
            );
            if (index !== -1) {
              taskData[payload.taskTitle][index] = res.data;
            }
            setTasks({ ...taskData });
            setIsOpen(false);
            toast.success("Task updated successfully");
          })
          .catch((err) => {
            toast.error(err?.message);
          });
      } else {
        ApiPost("tasks", payload)
          .then((res) => {
            let taskData = tasks;
            taskData[taskStatus.toDo.title].push(res.data);
            setTasks({ ...taskData });
            toast.success("Task added successfully");
            setIsOpen(false);
          })
          .catch((err) => {
            toast.error(err?.message);
          });
      }
    }
  };

  const handleSelect = (e) => {
    setInputValue({ ...inputValue, assigneeId: e?.value });
  };

  let userOption = users?.map((item) => {
    return {
      label: item?.userName,
      value: item?.id,
    };
  });

  return (
    <div>
      <div className={className}>
        <div className="modal" ref={modalRef}>
          <div className="modal-header ">
            <span>{inputValue?.id ? "Update task" : "Create task"}</span>
            <i
              class="fa-solid fa-xmark"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            ></i>
          </div>
          <div className="modal-body">
            <Input
              label="Title"
              type="text"
              placeholder="Enter Title"
              name="title"
              onChange={handleInput}
              onKeyDown={handleInput}
              value={inputValue?.title || ""}
              errors={errors?.title}
            />
            <Textarea
              label="Description"
              placeholder="Enter description"
              name="description"
              onChange={handleInput}
              onKeyDown={handleInput}
              value={inputValue?.description || ""}
              errors={errors?.description}
            />

            <div className="two-col-grid">
              <Input
                label="Start Date"
                type="date"
                name="startDate"
                onChange={handleInput}
                onKeyDown={handleInput}
                value={inputValue?.startDate || ""}
                errors={errors?.startDate}
              />
              <Input
                label="Due Date"
                type="date"
                name="dueDate"
                minDate={inputValue?.startDate ? inputValue?.startDate : null}
                onChange={handleInput}
                onKeyDown={handleInput}
                value={inputValue?.dueDate || ""}
                errors={errors?.dueDate}
              />
            </div>
            <SelectInput
              label="Assignee"
              placeholder="Select Assignee"
              name="assigneeId"
              value={
                inputValue?.assigneeId
                  ? {
                      label: users?.find(
                        (item) => item?.id === inputValue?.assigneeId
                      )?.userName,
                      value: inputValue?.assigneeId,
                    }
                  : null
              }
              onChange={handleSelect}
              errors={errors?.assigneeId}
              options={userOption || []}
            />
            <div className="form">
              <label>Priorty</label>
              <div className="two-button-alignment">
                {Object.keys(priorty).map((item, index) => {
                  return (
                    <div className="button" key={index}>
                      <button
                        className={inputValue?.priorty === item ? "active" : ""}
                        onClick={() =>
                          handleInput({
                            target: {
                              name: "priorty",
                              value: item,
                            },
                          })
                        }
                      >
                        {item}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="button-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button onClick={onSubmit}>
                {item?.id ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
