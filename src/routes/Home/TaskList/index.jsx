import React, { useEffect, useRef, useState } from "react";
import { TASKS } from "../../../Jotai/atomType";
import { useAtom } from "jotai";
import Card from "./Card";
import { toast } from "react-hot-toast";
import { ApiPut } from "../../../helpers/API/ApiData";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { taskStatus } from "../../../../constant/enums";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

export default function TaskList() {
  const [tasks, setTasks] = useAtom(TASKS);
  const userInfo =
    localStorage.getItem("task-user-info") &&
    JSON.parse(localStorage.getItem("task-user-info"));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleMoveTask = (task, newStatus) => {
    // Extract the taskId from the task object if needed
    const taskId = task.id;
    // Find the task to be moved
    const taskToMove = tasks[task.status].find((t) => t.id === taskId);
    if (taskToMove.taskTitle === newStatus) {
      return;
    }
    // Remove the task from the current column
    const updatedColumn = tasks[task.status].filter((t) => t.id !== taskId);
    let statusKey = null;

    for (const key in taskStatus) {
      if (
        taskStatus.hasOwnProperty(key) &&
        taskStatus[key].title === newStatus
      ) {
        statusKey = taskStatus[key].key;
        break; // Stop iterating once found
      }
    }
    taskToMove.taskStatus = statusKey;
    taskToMove.taskTitle = newStatus;
    taskToMove.updatedBy = userInfo?.id;

    ApiPut(`tasks/${taskId}`, {
      ...taskToMove,
    })
      .then(() => {
        setTasks({
          ...tasks,
          [task.status]: updatedColumn,
          [newStatus]: [...tasks[newStatus], taskToMove],
        });
        toast.success("Status updated successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className="grid">
          {Object.keys(tasks).map((status, i) => {
            return (
              <TaskColumn
                title={status}
                tasks={tasks[status]}
                onMoveTask={handleMoveTask}
              />
            );
          })}
        </div>
      </DndProvider>
    </div>
  );
}

const TaskColumn = ({ title, tasks, onMoveTask }) => {
  const [tasksData, setTasksData] = useAtom(TASKS);
  const [dropdwon, setDropdwon] = useState(false);
  const dropdownRef = useRef();
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      onMoveTask(item, title);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    onLeave: () => {
      setTimeout(() => {
        setDropdwon(false);
        setColumnZoomOut(true);
      }, 100);
    },
  });

  useOnClickOutside(dropdownRef, () => setDropdwon(false));

  const columnClassName = `grid-items ${isOver ? "drop-target" : ""} ${
    isOver ? "zoom-in" : ""
  }`;

  // Function to sort tasks by dueDate
  const sortByDueDate = () => {
    const newData = tasksData;
    newData[title] = newData[title].sort((a, b) => {
      const dueDateA = new Date(a.dueDate);
      const dueDateB = new Date(b.dueDate);
      return dueDateA - dueDateB;
    });
    setTasksData(newData);
    setDropdwon(false);
  };

  const sortByPriority = () => {
    const newData = tasksData;
    const priorty = {
      Major: "Major",
      Critical: "Critical",
      Minor: "Minor",
    };
    newData[title] = newData[title].sort((a, b) => {
      const priorityA = priorty[a.priorty];
      const priorityB = priorty[b.priorty];
      return priorityA.localeCompare(priorityB);
    });
    setTasksData(newData);
    setDropdwon(false);
  };

  const onFilterBy = (key) => {
    if (key === "dueDate") {
      sortByDueDate();
    } else {
      sortByPriority();
    }
  };

  return (
    <div className={columnClassName} ref={drop}>
      <div className="card-title">
        <span>{title}</span>
        <div className="relative-button" ref={dropdownRef}>
          <i onClick={() => setDropdwon(!dropdwon)} className="fa fa-filter" />

          <div className={dropdwon ? "dropdwon show" : "dropdwon hide"}>
            <span onClick={() => onFilterBy("dueDate")}>Due Date</span>
            <span onClick={() => onFilterBy("priorty")}>Priority</span>
          </div>
        </div>
      </div>
      <div className="card-body">
        {tasks?.map((item, index) => {
          return (
            <TaskCard
              key={item.id}
              task={item}
              index={index}
              onMoveTask={onMoveTask}
            />
          );
        })}
      </div>
    </div>
  );
};

const TaskCard = ({ task }) => {
  const [{ isDragging }, ref] = useDrag({
    type: "TASK",
    item: { id: task.id, status: task.taskTitle },
  });

  const cardStyle = {
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={ref} style={cardStyle}>
      <Card item={task} />
    </div>
  );
};
