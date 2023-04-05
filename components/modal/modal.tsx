import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, PropsWithChildren, useState } from "react";
import { IconButton } from "../iconButton/iconButton";
import styles from "./modal.module.css";
import utilities from "../../styles/utilities/utilities";

type ModalProps = {
  label: string;
  title: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Modal({
  label,
  title,
  children,
  ...rest
}: PropsWithChildren<ModalProps>) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen}

      <button {...rest} type="button" onClick={() => setIsOpen(true)}>
        {label}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={closeModal}
          style={{
            position: "relative",
            zIndex: 1000,
          }}
        >
          <Transition.Child
            as={Fragment}
            enter={styles.overlayEnter}
            enterFrom={styles.overlayEnterFrom}
            enterTo={styles.overlayEnterTo}
            leave={styles.overlayLeave}
            leaveFrom={styles.overlayLeaveFrom}
            leaveTo={styles.overlayLeaveTo}
          >
            <div className={styles.overlay} />
          </Transition.Child>

          <div
            style={{
              overflowY: "auto",
              position: "fixed",
              top: "0",
              right: "0",
              bottom: "0",
              left: "0",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: 16,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
              }}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={{
                    overflow: "hidden",
                    padding: 24,
                    backgroundColor: "#ffffff",
                    transitionProperty: "all",
                    textAlign: "left",
                    verticalAlign: "middle",
                    width: "100%",
                    maxWidth: "800px",
                    borderRadius: "1rem",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className={styles.header}>
                    <Dialog.Title as="h3" className={utilities.typograpy.alpha}>
                      {title}
                    </Dialog.Title>

                    <IconButton
                      outline={false}
                      onClick={() => setIsOpen(false)}
                      icon={"close"}
                    />
                  </div>

                  <div>{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
