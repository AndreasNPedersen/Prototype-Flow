import { createStore } from "solid-js/store";
import { createSignal } from 'solid-js';
import { Text, Input, Button,Box } from "@hope-ui/solid";
import { PostCreateQuestion,FetchAllCategories } from "../Requests";

function ModalDialog(props) {
    const { modalData,catDataSet,catData } = props

    const [category, setCategory] = createStore({
        questionId:0,
        adminTitle:"",
        userTitle:"",
        pictureURL:"",
        createdDate:"2022-11-16T12:58:21.280Z", //dump date data
        LastModifiedDate:"2022-11-16T12:58:21.280Z" //dump date data
    })

    async function sendRequest(){
        console.log(category)
        if (category.adminTitle.length > 1 && category.userTitle.length > 1){
            await PostCreateQuestion(category,catData.categoryId)
            console.log(modalData)
            const e = await FetchAllCategories();
            const ejson = await e.json().then(data => data);
            catDataSet(ejson);
            modalData(true);
        }
    }

    return (
        <div>
            
           <Text> Her laves et nyt spørgsmål, Husk start for enden i flowet. Indsæt en titel kun admins vil se, 
            Spørgsmålet kunden vil se og til sidst et billede URL til visning ved spørgsmålet.
            Det er vigtig at starte flowet med det sidste spørgsmål, hvorfra der kan vælges
            diverse stiger til flowet.
           </Text>
            <br />
            <Box textAlign={"center"} gap={"$10"}>
            <Input  w={"40rem"} marginTop={"$4"} placeholder="Indsæt en admin titel på spørgsmål" oninput={e=> setCategory({adminTitle:e.currentTarget.value})}></Input>
            <br />
            <Input  w={"40rem"} marginTop={"$4"} placeholder="Indsæt et kunde spørgsmål" oninput={e=> setCategory({userTitle:e.currentTarget.value})}></Input>
            <br />
            <Input  w={"40rem"} marginTop={"$4"} placeholder="Indsæt URL til billede" oninput={e=> setCategory({pictureURL:e.currentTarget.value})}></Input>
            <br />
            <Button marginTop={"$4"} padding={"$6"} marginBottom={"$2"} onclick={()=>sendRequest()}>Indsæt spørgsmål</Button>
            </Box>
        </div>
    );
}

export default ModalDialog;
