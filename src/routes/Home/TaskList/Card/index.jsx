import React, { useEffect, useRef, useState } from "react";
import "./Card.scss";
import { useAtom } from "jotai";
import { REGISTERUSERDATA, TASKS } from "../../../../Jotai/atomType";
import CardDetails from "../CardDetails";
import Tooltip from "../../../../components/HOC/Tooltip/Tooltip";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import CreateTicket from "../../CreateTicket";
import RemoveItem from "../../../../components/HOC/RemoveItem";
import { ApiDelete } from "../../../../helpers/API/ApiData";
import { toast } from "react-hot-toast";
export default function Card({ item, index }) {
  const [users] = useAtom(REGISTERUSERDATA);
  const [tasks, setTasks] = useAtom(TASKS);
  const dropdownRef = useRef();
  const [dropdwon, setDropdwon] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState();
  let assignee = users?.find((user) => user.id === item?.assigneeId);

  useEffect(() => {
    if (isOpen || edit || deleteModal) {
      setDropdwon(false);
    }
  }, [isOpen, edit, deleteModal]);

  useOnClickOutside(dropdownRef, () => setDropdwon(false));

  const onRemoveItem = (id) => {
    ApiDelete("tasks/" + id)
      .then((res) => {
        let data = {
          ...tasks,
        };
        data[item.taskTitle] = data[item.taskTitle].filter(
          (obj) => obj.id !== id
        );
        setTasks(data);
        toast.success("Task deleted successfully");
        setDeleteModal(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setDeleteModal(false);
      });
  };
  return (
    <>
      <div
        className="card"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        style={{ margin: "5px" }}
      >
        <div className="card-sub-text">
          <div className="card-text-grid">
            <p>{item?.title}</p>

            <div className="relative-button" ref={dropdownRef}>
              <div
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdwon(!dropdwon);
                }}
              >
                <i class="fa-solid fa-ellipsis"></i>
              </div>

              <div className={dropdwon ? "dropdwon show" : "dropdwon hide"}>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setEdit(true);
                  }}
                >
                  <i className="fa fa-edit" /> Edit
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                  }}
                >
                  <i className="fa fa-eye" /> Info
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteModal(true);
                  }}
                >
                  <i className="fa fa-trash" /> Delete
                </span>
              </div>
            </div>
          </div>
          <span>{item?.description}</span>
        </div>
        {assignee?.userName?.charAt(0) && (
          <div className="right-alignment">
            <Tooltip text={assignee?.userName}>
              <div>{assignee?.userName?.charAt(0)}</div>
            </Tooltip>
          </div>
        )}
      </div>
      <CardDetails isOpen={isOpen} setIsOpen={setIsOpen} item={item} />
      <CreateTicket isOpen={edit} setIsOpen={setEdit} item={item} />
      <RemoveItem
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        item={item}
        onRemoveItem={(item) => onRemoveItem(item.id)}
      />
    </>
  );
}
