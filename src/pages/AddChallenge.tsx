import React, { useState } from "react";
import Input from "../components/form/Input";
import Textarea from "../components/form/Textarea";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import {
  MdLan,
  MdLanguage,
  MdNewReleases,
  MdSave,
  MdTimer,
  MdTitle,
} from "react-icons/md";
import AddAlternative from "../components/form/AddAlternative";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../helpers/firebase";

type Answer = {
  id: number;
  content: string;
};

const c = `for(initialization; condition; increment/decrement){    
//statement or code to be executed    
}    `;

const js = `//JavaScript program to swap two variables

//take input from the users
let a = prompt('Enter the first variable: ');
let b = prompt('Enter the second variable: ');

//create a temporary variable
let temp;

//swap variables
temp = a;
a = b;
b = temp;
`;

const AddChallenge = () => {
  const [title, setTitle] = useState<string | number>("Qual é a resposta?");
  const [language, setLanguage] = useState<string | number>("java");
  const [code, setCode] = useState(js);
  const [difficulty, setDifficulty] = useState<string | number>("0.5");
  const [timer, setTimer] = useState<string | number>(300);

  const [a1, setA1] = useState("teste 1");
  const [a2, setA2] = useState("teste 2");
  const [a3, setA3] = useState("teste 3");
  const [a4, setA4] = useState("teste 4");
  const [a5, setA5] = useState("teste 5");
  const [correct, setCorrect] = useState("1");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const alternatives = [a1, a2, a3, a4, a5];

    const queRef = await addDoc(collection(db, "question"), {
      title,
      language,
      code,
      difficulty: +difficulty,
      alternatives,
      timer,
    });
    console.log("Document written with ID: ", queRef.id);

    const ansRef = await addDoc(collection(db, "answer"), {
      questionId: queRef.id,
      correct: parseFloat(correct),
    });
    console.log("Document written with ID: ", ansRef.id);
  };

  return (
    <div>
      <h1>Add new challenge</h1>
      <p>Aqui você pode adicionar um desafio.</p>
      <hr />

      <form onSubmit={handleSubmit}>
        <Input
          icon={<MdTitle />}
          label="Title"
          value={title}
          setState={setTitle}
        />
        <Input
          icon={<MdLanguage />}
          label="Linguagem"
          value={language}
          setState={setLanguage}
        />

        <Textarea rows={20} label="Código" value={code} setState={setCode} />

        <Input
          icon={<MdSave />}
          label="Selecione a dificuldade"
          value={difficulty}
          setState={setDifficulty}
        />

        <Input
          type="number"
          icon={<MdTimer />}
          label="Selecione o tempo em segundos"
          value={timer}
          setState={setTimer}
        />

        <div>
          <small>Selecione as alternativas e a resposta correta</small>
        </div>

        <AddAlternative
          name="correct"
          index={1}
          value={"1"}
          selectedOption={correct}
          setState={setCorrect}
          textValue={a1}
          setTextState={setA1}
        />

        <AddAlternative
          name="correct"
          index={2}
          selectedOption={correct}
          value={"2"}
          setState={setCorrect}
          textValue={a2}
          setTextState={setA2}
        />
        <AddAlternative
          name="correct"
          index={3}
          value={"3"}
          selectedOption={correct}
          setState={setCorrect}
          textValue={a3}
          setTextState={setA3}
        />
        <AddAlternative
          name="correct"
          index={4}
          value={"4"}
          selectedOption={correct}
          setState={setCorrect}
          textValue={a4}
          setTextState={setA4}
        />
        <AddAlternative
          name="correct"
          index={5}
          value={"5"}
          selectedOption={correct}
          setState={setCorrect}
          textValue={a5}
          setTextState={setA5}
        />
        <p>Resposta Correta Selecionada: {correct}</p>
        <hr />
        <Button icon={<MdNewReleases />} type="submit">
          Salvar
        </Button>
      </form>
    </div>
  );
};

export default AddChallenge;
