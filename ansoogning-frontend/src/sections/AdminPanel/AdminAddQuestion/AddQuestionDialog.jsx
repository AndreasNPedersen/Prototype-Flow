import { Button, 
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,Text
  } from "@hope-ui/solid"
  import { createSignal } from 'solid-js';
  import ModalDialog from './ModalDialog'
  
  
  function AddQuestionDialog(props) {
    const { catDataSet,catData } = props
      const [open, setOpen] = createSignal(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
  
      return (
          <div>
              <Button onClick={handleOpen}>Tilføj spørgsmål</Button>
              <Modal
              opened={open()} 
              onClose={handleClose}
              centered
              size={"xl"}
              >
              <ModalOverlay />
          <ModalContent maxWidth={"100rem"}>
            <ModalCloseButton />
            <ModalHeader>Tilføj Spørgsmål</ModalHeader>
            <ModalBody>
              <ModalDialog catData={catData} catDataSet={catDataSet} modalData={handleClose}></ModalDialog>
            </ModalBody>
            <ModalFooter >
              <Button colorScheme="danger" onClick={handleClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
              </Modal>
          </div>
      );
  }
  
  export default AddQuestionDialog;
  