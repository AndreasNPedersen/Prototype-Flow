import { createStore } from "solid-js/store";
import { createSignal, For, onMount } from 'solid-js';
import {
    Text, Input, Button, Box, Radio, RadioGroup,
    Select,
  SelectTrigger,
  SelectPlaceholder,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectListbox,
  SelectOption,
  SelectOptionText,
  SelectOptionIndicator, HStack, Center
} from "@hope-ui/solid";
import { FetchAllAnswers, FetchAllQuestionFromCategory, PostCreateAnswer } from "../../Requests";

function AddAnswer(props) {
    const { answer, answerList, modalData, catData } = props

    const [theAnswer, setAnswer] = createStore({
        AnswerId: 0,
        TheAnswer: "",
        InputType: "TextBox",
        ToQuestion: 0,
        createdDate:"2022-11-16T12:58:21.280Z", //dump date data
        LastModifiedDate:"2022-11-16T12:58:21.280Z" //dump date data
    })

    const [questions, setQuestions] = createStore([])
    const [questionIndex,setQuestionIndex] = createSignal(0)
    onMount(async () => {
        const e = await FetchAllQuestionFromCategory(catData);
        const ejson = await e.json().then(data => data);
        setQuestions(ejson);
    });

    async function sendRequest() {
        if (theAnswer.InputType.length > 1 && theAnswer.TheAnswer.length > 1 && theAnswer.ToQuestion >= 0) {
            setAnswer({ToQuestion: questionIndex()})

            await PostCreateAnswer(theAnswer,answer.questionId)
            const e = await FetchAllAnswers(answer.questionId)
            const ejson = await e.json().then(data => data);
            answerList(ejson);
            modalData(true);
        }
    }

    return (
        <div>


            <Center>
                <Box w={"40rem"} textAlign={"center"} gap={"$10"}>
                    <Text>
                        Her laves et nyt svar.
                    </Text>
                    <Input marginTop={"$4"} placeholder="Indsæt et svar til spørgsmålet" oninput={e => setAnswer({ TheAnswer: e.currentTarget.value })}></Input>
                    <br />
                    <br />
                    <Text>
                        Hvilken type input der kræves.
                    </Text>
                    <RadioGroup defaultValue="TextBox">
                        <HStack spacing="$4">
                            <Radio onInput={() => setAnswer({ InputType: "Text" })} value="Text">Text boks</Radio>
                            <Radio onInput={() => setAnswer({ InputType: "Radio" })} value="Radio">Select knap</Radio>
                        </HStack>
                    </RadioGroup>
                    <br />
                    <Text>
                        vælg hvilket spørgsmål svaret skal gå hen til
                    </Text>

                    <Select value={questionIndex()} onChange={setQuestionIndex}>
                        <SelectTrigger>
                            <SelectPlaceholder>Hvor skal svaret føre hen?</SelectPlaceholder>
                            <SelectValue />
                            <SelectIcon />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectListbox>
                                <For each={questions}>
                                    {item => (
                                        <SelectOption value={item.questionId}>
                                            <SelectOptionText>{item.adminTitle}</SelectOptionText>
                                            <SelectOptionIndicator />
                                        </SelectOption>
                                    )}
                                </For>
                                <SelectOption value={999998}>
                                            <SelectOptionText>Næste kategori</SelectOptionText>
                                            <SelectOptionIndicator />
                                        </SelectOption>
                                <SelectOption value={999999}>
                                            <SelectOptionText>Slutning</SelectOptionText>
                                            <SelectOptionIndicator />
                                        </SelectOption>
                            </SelectListbox>
                        </SelectContent>
                    </Select>
                    <br />
                    <Button marginTop={"$4"} padding={"$6"} marginBottom={"$2"} onclick={() => sendRequest()}>Indsæt spørgsmål</Button>
                </Box>
            </Center>
        </div>
    );
}

export default AddAnswer;
