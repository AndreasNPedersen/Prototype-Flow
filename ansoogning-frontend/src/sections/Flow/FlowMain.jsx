import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel, Text, Container, Box, HStack, Button
} from "@hope-ui/solid"
import { createSignal, For, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import FlowQuestion from "./FlowQuestion";
import { FetchAllCategories } from "./Requests";




function FlowMain() {
    const [index, setIndex] = createSignal(1)
    const [categories, setCategories] = createStore([])
    onMount(async () => {
        const e = await FetchAllCategories()
        const ejson = await e.json().then(data => data);
        setCategories(ejson)
    })



    return (
        <div>
            <Container>
                <Box w={"50rem"}>

                    <Accordion
                        index={index()}>
                        <For each={categories}>{category =>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Text flex={1} fontWeight="$medium" textAlign="start">
                                            {category.title}
                                        </Text>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    <FlowQuestion setCatIndex={setIndex} getCatIndex={index} category={category}
                                    categoriesLength={categories.length}></FlowQuestion>
                                </AccordionPanel>
                            </AccordionItem>
                        }
                        </For>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Text flex={1} fontWeight="$medium" textAlign="start">
                                        Slut
                                    </Text>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                Her vil alle bruger informationer være
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Container>

        </div>
    );
}

export default FlowMain;
