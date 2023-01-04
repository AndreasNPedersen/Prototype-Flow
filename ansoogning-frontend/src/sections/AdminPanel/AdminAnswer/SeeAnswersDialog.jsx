import { Button, 
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from "@hope-ui/solid"
  import { createSignal } from 'solid-js';
import { createStore } from "solid-js/store";
import AllAnswersModalDialog from "./AllAnswersModalDialog";

  
  
  function SeeAnswersDialog(props) {
    const { answer, catData } = props
    const [open, setOpen] = createSignal(false);
   

    const handleOpen = () => {
        setOpen(true)

    };
    const handleClose = () => {setOpen(false)};
  
      return (
          <div>
              <Button onClick={handleOpen}>Se Svarmuligher</Button>
              <Modal
              opened={open()} 
              onClose={handleClose}
              centered
              size={"xl"}
              >
              <ModalOverlay />
          <ModalContent maxWidth={"100rem"}>
            <ModalCloseButton />
            <ModalHeader>Se Svarmuligher</ModalHeader>
            <ModalBody>
              <AllAnswersModalDialog catData={catData} answer={answer}></AllAnswersModalDialog>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="danger" onClick={handleClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
              </Modal>
          </div>
      );
  }
  
  export default SeeAnswersDialog;
  