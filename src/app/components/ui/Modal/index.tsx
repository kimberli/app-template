import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/react";

type AppModalProps = ModalProps;

const AppModal: React.FC<AppModalProps> = ({
  children,
  ...props
}: AppModalProps) => {
  return (
    <Modal
      classNames={{
        backdrop: "backdrop-opacity-80 backdrop-brightness-50 backdrop-blur-sm",
        base: "rounded-sm max-h-[90dvh] my-4",
        wrapper: "overflow-y-auto py-4 items-center",
        body: "pb-4",
        closeButton: "hover:bg-background active:bg-background",
      }}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
export { ModalBody, ModalContent, ModalFooter, ModalHeader };
