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


function AddCategoryDialog(props) {
  const { catData } = props
    const [open, setOpen] = createSignal(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => {setOpen(false)};

    return (
        <div>
            <Button onClick={handleOpen}>Tilføj Kategori</Button>
            <Modal
            opened={open()} 
            onClose={handleClose}
            centered
            size={"xl"}
            >
            <ModalOverlay />
        <ModalContent maxWidth={"100rem"}>
          <ModalCloseButton />
          <ModalHeader>Tilføj Flow/Kategori</ModalHeader>
          <ModalBody>
            <ModalDialog catData={catData} modalData={handleClose}></ModalDialog>
          </ModalBody>
          <ModalFooter >
            <Button colorScheme="danger" onClick={handleClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
            </Modal>
        </div>
    );
}

export default AddCategoryDialog;
