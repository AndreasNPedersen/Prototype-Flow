import { APIip } from "../Constans";


export async function FetchAllCategories() {
    return await fetch(APIip+"/categories", {
        method: "Get",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response);
}

export async function FetchQuestion(id) {
    return await fetch(APIip+"/questions/" +id, {
        method: "Get",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response);
}
export async function FetchStartQuestion(id) {
    return await fetch(APIip+"/questions/start/" +id, {
        method: "Get",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response);
}

export async function FetchAnswer(id) {
    return await fetch(APIip+"/Answers/" +id, {
        method: "Get",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response);
}