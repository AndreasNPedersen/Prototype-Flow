import { createStore } from "solid-js/store";
import { For, onMount } from 'solid-js';
import {
    Text, Button, Box, Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from "@hope-ui/solid";
import { FetchAllAnswers, FetchAllQuestions } from "../Requests";
import AddAnswersModal from "./AddAnswer/AddAnswerModal";


function AllAnswersModalDialog(props) {
    const { answer, catData } = props
    const [answerList, setAnswerList] = createStore([])
    const [questionList, setQuestionList] = createStore([])

    onMount(async () => {
        const e = await FetchAllAnswers(answer.questionId)
        const ejson = await e.json().then(data => data);
        setAnswerList(ejson)
        const request = await FetchAllQuestions()
        const requestjson = await request.json().then(data => data);
        setQuestionList(requestjson)
    });

    function showTitles(questionIndex) {
        let a;
        questionList.forEach(element => {
            if (questionIndex === 999998) {
                a = "næste kategori"
            }
            if (questionIndex === 999999){
                a = "Slut resultat"
            }
            if (questionIndex === element.questionId) {
                a= element.adminTitle
            }
           
        });
        return a;
    }

    return (
        <div>

            <Text>
                Her ses svarene til spørgsmålet. Du kan vælge at indsætte, Slette eller redigere svaret.
            </Text>
            <Box textAlign={"end"}>
                <AddAnswersModal answer={answer} catData={catData} answerList={setAnswerList} />
            </Box>
            <br />
            <Table>

                <Thead>
                    <Tr>
                        <Th>Nummer</Th>
                        <Th>Svar</Th>
                        <Th>Input form</Th>
                        <Th>gør videre til</Th>
                        <Th>Kontrol</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <For each={answerList}>
                        {(ans, i) =>
                            <Tr>
                                <Td>{ans.answerId}</Td>
                                <Td>{ans.theAnswer}</Td>
                                <Td>{ans.inputType}</Td>
                                <Td>{showTitles(ans.toQuestion)} </Td>
                            </Tr>
                        }
                    </For>

                </Tbody>
            </Table>
        </div>
    );
}

export default AllAnswersModalDialog;
