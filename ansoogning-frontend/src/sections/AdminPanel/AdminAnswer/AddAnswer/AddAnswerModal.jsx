import { Button, 
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from "@hope-ui/solid";
  import { createSignal } from 'solid-js';
import { createStore } from "solid-js/store";
import AddAnswer from "./AddAnswer";


  
  
  function AddAnswersModal(props) {
    const { answer,answerList, catData } = props
    const [open, setOpen] = createSignal(false);
   

    const handleOpen = () => {
        setOpen(true)

    };
    const handleClose = () => {setOpen(false)};
  
      return (
          <div>
              <Button onClick={handleOpen}>Tilføj Svar</Button>
              <Modal
              opened={open()} 
              onClose={handleClose}
              centered
              size={"xl"}
              >
              <ModalOverlay />
          <ModalContent maxWidth={"100rem"}>
            <ModalCloseButton />
            <ModalHeader>Tilføj et svar til spørgsmålet</ModalHeader>
            <ModalBody>
              <AddAnswer answer={answer} catData={catData} answerList={answerList} modalData={handleClose}></AddAnswer>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="danger" onClick={handleClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
              </Modal>
          </div>
      );
  }
  
export default AddAnswersModal;
  