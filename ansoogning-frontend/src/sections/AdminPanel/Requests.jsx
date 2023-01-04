import { APIip } from "../Constans";

export async function FetchAllCategories() {
    return await fetch(APIip+"/Categories", {
        method: "Get",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response);
}


export async function FetchAllQuestionFromCategory(id) {
    return await fetch(APIip+"/Questions/"+id, {
        method: "Get",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response);
}

export async function FetchAmountCategory() {
    return await fetch(APIip+"/Questions/AmountOfCategories", {
        method: "Get",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response);
}

export async function FetchAllAnswers(indexOfQuestion) {
    return await fetch(APIip+"/Answers/"+indexOfQuestion, {
        method: "Get",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response);
}

export async function FetchAllQuestions() {
    return await fetch(APIip+"/Questions/", {
        method: "Get",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response)=> response);
}


export async function PostCreateCategory(titel) {
    return await fetch(APIip+"/Categories", {
        method: "Post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(titel)
    }).then((response)=> response);
}

export async function PostCreateQuestion(questionObject,Categoryid) {
    return await fetch(APIip+"/Questions?Categoryid="+Categoryid, {
        method: "Post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionObject)
    }).then((response)=> response);
}

export async function PostCreateAnswer(answerObject,questionId) {
    return await fetch(APIip+"/Answers?questionId="+questionId, {
        method: "Post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answerObject)
    }).then((response)=> response);
}