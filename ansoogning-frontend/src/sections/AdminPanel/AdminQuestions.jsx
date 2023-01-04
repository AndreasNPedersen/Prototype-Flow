import { Box,Text, SimpleGrid, Button,Divider} from "@hope-ui/solid"

import { createStore, produce } from "solid-js/store";
import { Index, onMount, Show } from 'solid-js';
import { FetchAllQuestionFromCategory } from "./Requests";
import SeeAnswersDialog from "./AdminAnswer/SeeAnswersDialog";

function AdminQuestions(props) {
    const { catData } = props
    const [questions, setQuestions] = createStore([])

    onMount(async () => {
        const r = await FetchAllQuestionFromCategory(catData.categoryId);
        const rjson = await r.json().then(data => data);
        setQuestions(rjson)

    });

    function showButtons(index,indexMax) {

        if(index.i == 0 && index.i == indexMax) {
            return;
        }
        else if (index.i == 0) {
            return <Button>Ned</Button>
        }
        else if (index.i == indexMax) {
            return <Button>Op</Button>
        }
        else {
            return <div> <Button>Op</Button> <Button>Ned</Button></div>
        }
    }


    return (
        <div>

            <Box marginTop={"$1"} marginLeft={"$1"} width={"98%"} >

                    <Index each={questions}>
                        {(question, i) => 
                        <div>

                            <SimpleGrid columns={3} margin={"$4"} borderBottomColor={"$blackAlpha10"} borderRadius="$sm" borderWidth={"2px"}>
                                <Box>
                                    <Text >
                                        {question().adminTitle}
                                    </Text>
                                </Box>
                                <Box>
                                    {showButtons({i},questions.length-1)} 
                                </Box>
                                <Box>
                                    <Text textAlign={"end"}>
                                        <SeeAnswersDialog catData={catData.categoryId} answer={question()}/>
                                    </Text>
                                </Box>
                        </SimpleGrid>
                        <Divider thickness={"$1"}/>

                        </div>
                        }
                    </Index>
            </Box>

            <br />
        </div>
    );
}

export default AdminQuestions;
