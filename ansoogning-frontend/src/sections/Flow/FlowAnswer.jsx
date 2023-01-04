import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel, Text, Container, Box, HStack, Button, Center, Input, VStack, Radio, RadioGroup
} from "@hope-ui/solid"
import {createSignal, For, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { FetchAnswer } from "./Requests";




function FlowAnswer(props) {
    
    const [toQestion,setToQeustion] = createSignal()
    const [answers, setAnswers] = createStore([])
    const {getCatIndex, setCatIndex, questionId, 
        questionIndex, setIndex, index, categoriesLength } = props

    onMount(async () => {
        const r = await FetchAnswer(questionId)
        const rjson = await r.json().then(data => data);
        await setAnswers(rjson);
    })

    function fowardOne(){
        if (toQestion()===999998){
            if (categoriesLength!=getCatIndex()){
                setCatIndex(getCatIndex()+1)
            } else {
                setCatIndex(0)
            }
            return
        }
        if (toQestion()==999999){
            setCatIndex(0)
            return
        }
        setIndex(toQestion())
    }

    function backwardOne(){
        if (index-1!=-1){
            setIndex(questionIndex[index-1].questionId)
        } else {
            if (getCatIndex()!=1){
                setCatIndex(getCatIndex()-1)
            }
        }
    }


  

    return (
        <div>
                <VStack>
            <Center>
                <RadioGroup>

                    <For each={answers}>
                        {answer => <div>
                            <Text>{answer.theAnswer}</Text>
                            <Show when={answer.inputType ==="Text"} >
                                <Input onInput={()=> setToQeustion(answer.toQuestion)} placeholder={answer.theAnswer}></Input>
                            </Show>
                            <Show when={answer.inputType ==="Radio"} >
                                <Radio onclick={()=> setToQeustion(answer.toQuestion)} placeholder={answer.theAnswer}></Radio>
                            </Show>
                        </div>
                        }
                    </For>
                </RadioGroup>
            </Center>
                </VStack>
            <br />
            <Center>

            <Button onClick={()=> backwardOne()}>Tilbage</Button>
            <Button onClick={()=> fowardOne()}>Næste</Button>
            </Center>
        </div>
    )
}




export default FlowAnswer;
