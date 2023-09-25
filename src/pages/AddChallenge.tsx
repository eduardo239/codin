import React, { useState } from "react";
import Input from "../components/form/Input";
import Textarea from "../components/form/Textarea";
import Button from "../components/form/Button";
import {
  MdOutlineLanguage,
  MdOutlineNewReleases,
  MdOutlineSave,
  MdOutlineTimer,
  MdOutlineTitle,
} from "react-icons/md";
import AddAlternative from "../components/form/InputAlternative";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { js } from "../helpers/code";
import { handleSubmitChallenge } from "../helpers";

const AddChallenge = () => {
  const [title, setTitle] = useState<string | number>("Qual é a resposta?");
  const [language, setLanguage] = useState<string | number>("java");
  const [code, setCode] = useState(js);
  const [difficulty, setDifficulty] = useState<string | number>("0.5");
  const [timer, setTimer] = useState<string | number>(300);

  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");
  const [a4, setA4] = useState("");
  const [a5, setA5] = useState("");
  const [correct, setCorrect] = useState("1");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const _challenge = {
      title: title.toString(),
      language: language.toString(),
      code: code.toString(),
      difficulty: +difficulty,
      timer: timer.toString(),
      correct: correct,
      timestamp: Timestamp.now(),
    };
    const _alternatives = [a1, a2, a3, a4, a5];
    await handleSubmitChallenge(_challenge, _alternatives);
  };

  return (
    <div>
      <h1>Add new challenge</h1>
      <p>Aqui você pode adicionar um desafio.</p>
      <hr />

      <form onSubmit={handleSubmit}>
        <Input
          icon={<MdOutlineTitle />}
          label="Title"
          value={title}
          setState={setTitle}
        />
        <Input
          icon={<MdOutlineLanguage />}
          label="Linguagem"
          value={language}
          setState={setLanguage}
        />

        <Textarea rows={20} label="Código" value={code} setState={setCode} />

        <Input
          icon={<MdOutlineSave />}
          label="Selecione a dificuldade"
          value={difficulty}
          setState={setDifficulty}
        />

        <Input
          type="number"
          icon={<MdOutlineTimer />}
          label="Selecione o tempo em segundos"
          value={timer}
          setState={setTimer}
        />

        <div>
          <small>Selecione as alternativas e a resposta correta</small>
        </div>

        <hr />

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
        <p>Resposta Selecionada: {correct}</p>

        <hr />

        <Button variant="primary" icon={<MdOutlineNewReleases />} type="submit">
          Salvar
        </Button>
      </form>
    </div>
  );
};

export default AddChallenge;
