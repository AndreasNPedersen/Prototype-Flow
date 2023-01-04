import { createStore } from "solid-js/store";
import { createSignal } from 'solid-js';
import { Text, Input, Button,Box } from "@hope-ui/solid";
import { PostCreateCategory,FetchAllCategories } from "../Requests";

function ModalDialog(props) {
    const { modalData,catData } = props

    const [category, setCategory] = createSignal("")

    async function sendRequest(){
        if (category() !== "" && category().length<256){
            await PostCreateCategory(category())
            console.log(category())
            console.log(modalData)
            const e = await FetchAllCategories();
            const ejson = await e.json().then(data => data);
            catData(ejson)
            console.log(ejson)
            modalData(true);
        }
    }

    return (
        <div>
            
           <Text> Her laves en ny kategory. Indsæt en titel og tryk på gem knappen, 
            derfra kan der laves spørgsmål til kategorien ved at klikke på Tilføj spørgsmål.
            Det er vigtig at starte flowet med det sidste spørgsmål, hvorfra der kan vælges
            diverse stiger i flowet.
           </Text>
            <br />
            <Box textAlign={"center"} gap={"$10"}>
            <Input  w={"40rem"} placeholder="Indsæt titel på Flow" oninput={e=> setCategory(e.currentTarget.value)}></Input>
            <Button marginLeft={"$4"} padding={"$6"} marginBottom={"$2"} onclick={()=>sendRequest()}>Indsæt</Button>
            </Box>
        </div>
    );
}

export default ModalDialog;
