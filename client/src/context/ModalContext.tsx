import { createContext, FC, ReactNode, useState } from "react";

export interface IModalContext {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<any>({});

interface ConversationModalProps {
  children: ReactNode;
}

const ConversationModalProvider: FC<ConversationModalProps> = ({
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const value: IModalContext = {
    modalOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ConversationModalProvider;
