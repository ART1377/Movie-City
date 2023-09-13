import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

type Props = {
  children: React.ReactNode;
  toggle?: React.ReactNode;
  title: string;
};

const ModalComponent = ({ children, toggle, title }: Props) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <style>
        {`
          .modalStyle{
            border-radius: var(--radius);
            background-color:var(--text-light);
          }
          .closeBtn{
            background-color:#e5e7eb;
            border-radius: 100%;
            padding:4px;
          }
          `}
      </style>

      <div>
        <button onClick={onOpenModal}>{toggle}</button>
        <Modal
          open={open}
          onClose={onCloseModal}
          center
          classNames={{
            modal: "modalStyle",
            closeButton:"closeBtn",
          }}
        >
          <h5 className="text-text-dark text-center mt-7">{title}</h5>
          {children}
        </Modal>
      </div>
    </>
  );
};

export default ModalComponent;
