import React, { useState, useEffect } from 'react';
import List from "./List";
import ProgressBar from "./ProgressBar";
import db from "../firebase";

function Form() {
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);
    const [progressBar, setProgressBar] = useState(0);

    /*
        Pro ziskani dat z firebase (reload) a po KAZDE ZMENE v firebase firestore.
        Uklada se to do pole, abych pote predal jako prop List Componentu, ktera pracuje s temito daty.
        Id ctu, abych potom mohl predat jako property pro jednotlive Itemy + jejich unikatni klice.
        Timestamp ctu, abych mohl pote sestupne seradit data od nejstarsi po nejnovejsi.
    */
    useEffect(() => {
        db.collection("tasks").orderBy("timestamp", "asc").onSnapshot(snapshot => {
            setList(snapshot.docs.map(doc => ({
                id: doc.id,
                timestamp: doc.data().timestamp,
                text: doc.data().text,
                isDone: doc.data().isDone
            })));
        });
    }, []);
    
    /*
        Pri kazde zmene state list, prepocitam pocet hotovych tasku.
    */
    useEffect(() => {
        const listOfDone = list.filter(item => {
            if(item.isDone){
                return true;
            }
            return false;
        });
        
        let bar = (listOfDone.length / list.length) * 100;
        setProgressBar(bar);
    }, [list])

    function ChangeInput(e) {
        setInput(e.target.value);
    }

    function SubmitTask(e) {
        e.preventDefault();

        if(input.length > 0)
        {
            const uniqueDate = new Date();

            db.collection("tasks").add({
                timestamp: uniqueDate, 
                text: input,
                isDone: false
            });

            setInput("");
        }
    }

    /*
        Pro zmenu stavu hotovo/nehotovo.
    */
    function IsDone(id) {
        list.forEach(item => {
            if(item.id === id)
            {
                db.collection("tasks").doc(id).update({isDone: !item.isDone});
            }
        });
    }

    /*
        Pro smazani celeho obsahu todo-list + vsech dokumentu ve firebase firestore.
    */
    function ClearList(checkerAgainstOnSnapshot) {
        let ids = [];

        db.collection("tasks").onSnapshot(snapshot => {
            if(checkerAgainstOnSnapshot)
            {
                ids = snapshot.docs.map(doc => doc.id);
                ids.forEach(id => db.collection("tasks").doc(id).delete());
                checkerAgainstOnSnapshot = false;
            }
        });
    }

    return (
        <>
            <div className="form">
                <form onSubmit={SubmitTask}>
                    <label>Enter your task:</label>
                    <input placeholder="Create Task" value={input} onChange={ChangeInput}/>
                </form>
            </div>

            <button id="clear-button" onClick={() => ClearList(true)}>Clear List</button>
            <ProgressBar width={progressBar}/>
            <List list={list} IsDone={IsDone}/>
            {/* <button onClick={() => console.log(list)}>Click me</button> */}
        </>
    )
}

export default Form;
