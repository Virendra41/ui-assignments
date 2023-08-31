import React, { useEffect, useState } from "react";
import "./RemoveItem.scss";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

export default function RemoveItem({
  deleteModal,
  setDeleteModal,
  item,
  onRemoveItem,
}) {
  const [modal, setModal] = useState(false);
  const ref = React.useRef();

  useOnClickOutside(ref, () => setDeleteModal(false));

  useEffect(() => {
    setModal(deleteModal);
  }, [deleteModal]);

  return (
    <>
      <div
        className={
          modal ? "remove-modal-wrapper show" : "remove-modal-wrapper hide"
        }
      >
        <div className="modal-remove-content" ref={ref}>
          <div className="modal-remove-header">
            <div className="remove-items-text">
              <span>Remove Item</span>
              <p>
                Are you sure you want to remove <b>"{item?.title}"</b> task?
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="outline-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteModal(false);
                }}
              >
                No
              </button>
              <button
                className="fill-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveItem(item);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
