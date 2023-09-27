import React, { useState } from "react";
import Input from "../components/form/Input";
import Textarea from "../components/form/Textarea";
import Button from "../components/form/Button";
import {
  MdOutlineNewReleases,
  MdOutlineSave,
  MdOutlineTimer,
  MdOutlineTitle,
} from "react-icons/md";
import AddAlternative from "../components/form/InputAlternative";
import { Timestamp } from "firebase/firestore";
import { js } from "../helpers/code";
import { handleSubmitChallenge } from "../helpers";
import { languageList } from "../helpers/constants";
import Select from "../components/form/Select";
import { useData } from "../context/DataContext";

const AddChallenge = () => {
  const { handleMessage } = useData();

  const [title, setTitle] = useState<string | number>("Título do desafio !");
  const [language, setLanguage] = useState<string | number>("");
  const [code, setCode] = useState(js);
  const [difficulty, setDifficulty] = useState<string | number>("0.5");
  const [timer, setTimer] = useState<string | number>(300);

  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");
  const [a4, setA4] = useState("");
  const [a5, setA5] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!title) {
      handleMessage(
        `É necessário escolher um título, a descrição do desafio, uma pergunta.`,
        "warning"
      );
      return;
    }

    if (!language) {
      handleMessage(
        `É necessário escolher a linguagem de programação.`,
        "warning"
      );
      return;
    }

    if (!code) {
      handleMessage(`É necessário adicionar o código do desafio.`, "warning");
      return;
    }

    if (!difficulty || +difficulty > 1 || +difficulty < 0) {
      handleMessage(
        `É necessário escolher dificuldade do desafio, o valor fica entre 0 e 1.`,
        "warning"
      );
      return;
    }

    if (+timer < 10) {
      handleMessage(
        `O tempo do desafio, tem que ser maior do que 10 segundos1.`,
        "warning"
      );
      return;
    }

    if (!a1 || !a2 || !a3 || !a4 || !a5) {
      handleMessage(`É necessário preencher as alternativas.`, "warning");
      return;
    }

    const _challenge = {
      title: title.toString(),
      language: language.toString(),
      code: code.toString(),
      difficulty: +difficulty,
      timer: timer.toString(),
      correct: correctAnswer,
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

        <Select list={languageList} setItem={setLanguage} />

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
          selectedOption={correctAnswer}
          setState={setCorrectAnswer}
          textValue={a1}
          setTextState={setA1}
        />

        <AddAlternative
          name="correct"
          index={2}
          selectedOption={correctAnswer}
          value={"2"}
          setState={setCorrectAnswer}
          textValue={a2}
          setTextState={setA2}
        />
        <AddAlternative
          name="correct"
          index={3}
          value={"3"}
          selectedOption={correctAnswer}
          setState={setCorrectAnswer}
          textValue={a3}
          setTextState={setA3}
        />
        <AddAlternative
          name="correct"
          index={4}
          value={"4"}
          selectedOption={correctAnswer}
          setState={setCorrectAnswer}
          textValue={a4}
          setTextState={setA4}
        />
        <AddAlternative
          name="correct"
          index={5}
          value={"5"}
          selectedOption={correctAnswer}
          setState={setCorrectAnswer}
          textValue={a5}
          setTextState={setA5}
        />
        <p>Resposta Selecionada: {correctAnswer}</p>

        <hr />

        <Button variant="primary" icon={<MdOutlineNewReleases />} type="submit">
          Salvar
        </Button>
      </form>
    </div>
  );
};

export default AddChallenge;
