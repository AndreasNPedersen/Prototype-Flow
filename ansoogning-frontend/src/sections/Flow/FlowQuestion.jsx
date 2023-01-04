import {
    Text, Container, Box, HStack, Button, Center
} from "@hope-ui/solid"
import { createSignal, Index, Match, onMount, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import FlowAnswer from "./FlowAnswer";
import { FetchQuestion, FetchStartQuestion } from "./Requests";




function FlowQuestion(props) {
    const { getCatIndex, category, setCatIndex, categoriesLength } = props
    const [questions, setQuestions] = createStore([])
    const [indexQ, setIndexQ] = createSignal(0);

    onMount(async () => {
        const r = await FetchQuestion(category.categoryId)
        const rjson = await r.json().then(data => data);
        setQuestions(rjson);
        const rTwo = await FetchStartQuestion(category.categoryId)
        const rTwojson = await rTwo.json().then(data => data);
        await setIndexQ(rTwojson)
        console.log(indexQ())
    })

    return (
        <div>
            <Index each={questions}>
                {(quest, i) =>
                    <div>
                        <Switch>
                            <Match when={indexQ() == quest().questionId}>

                                <br />
                                <Center>
                                    {quest().userTitle}?
                                </Center>
                                <Text textAlign={"center"}> Svarmuligheder:</Text>
                                <FlowAnswer categoriesLength={categoriesLength} getCatIndex={getCatIndex} setCatIndex={setCatIndex}
                                    questionIndex={questions} questionId={quest().questionId} index={i}
                                    setIndex={setIndexQ}>
                                </FlowAnswer>
                            </Match>

                        </Switch>
                    </div>}
            </Index>
        </div>
    )
}




export default FlowQuestion;
