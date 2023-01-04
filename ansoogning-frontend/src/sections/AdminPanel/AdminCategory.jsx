import { Box,Text, Grid, GridItem, Divider, Button, SimpleGrid } from "@hope-ui/solid"
import { For, onMount } from 'solid-js';
import { createStore, produce } from "solid-js/store";
import { FetchAllCategories } from "./Requests";

import AdminQuestions from "./AdminQuestions";
import AddCategoryDialog from "./AdminAddCategory/AddCategoryDialog";
import AddQuestionDialog from "./AdminAddQuestion/AddQuestionDialog";

function AdminCategory() {

    const [categories, setCategories] = createStore([])

    onMount(async () => {
        const e = await FetchAllCategories()
        const ejson = await e.json().then(data => data);
        setCategories(ejson)

    });

    return (
        <div>
            <Box>
            <Text textAlign={"end"}>
                <AddCategoryDialog catData={setCategories}/>
            </Text>
            <br />
                <Grid templateColumns="repeat(2, 1fr)" gap={"$6"}>
                    <For each={categories}>
                        {(category, i) =>
                                <GridItem borderBottomColor={"$blackAlpha10"} borderRadius="$2xl" borderWidth={"2px"}>
                                    <br />
                                    <SimpleGrid columns={2}>
                                        <Box>
                                        <Text fontWeight={"$bold"} size="3xl">{category.title}</Text>
                                        </Box>
                                        <Box>
                                            <AddQuestionDialog catData={category} catDataSet={setCategories}/>
                                        </Box>
                                    </SimpleGrid>

                                        <Divider paddingBottom={"$3"} thickness={"$1"} color={"$blackAlpha10"} />
                                        <AdminQuestions catData={category}/>
                                </GridItem>
                        }
                    </For>
                </Grid>
            </Box>
        </div>
    );
}

export default AdminCategory;
