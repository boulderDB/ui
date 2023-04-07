import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, PropsWithChildren, useState } from "react";
import { IconButton } from "../iconButton/iconButton";
import styles from "./modal.module.css";
import utilities from "../../styles/utilities/utilities";

type ModalProps = {
  label: string | React.ReactNode;
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
                enter={styles.modalEnter}
                enterFrom={styles.isHiddenModal}
                enterTo={styles.isVisibleModal}
                leave={styles.modalLeave}
                leaveFrom={styles.isVisibleModal}
                leaveTo={styles.isHiddenModal}
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
                    minHeight: 400,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className={styles.header}>
                    <Dialog.Title
                      as="h3"
                      className={utilities.typograpy.alpha700}
                    >
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
