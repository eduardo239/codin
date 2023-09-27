import { useEffect, useState } from "react";

import { useQuery } from "../helpers/helper";
import CodeHighlighter from "../components/code/CodeHighlighter";
import { DocumentData, Timestamp, doc, getDoc } from "firebase/firestore";
import Alternative from "../components/form/Alternative";
import Button from "../components/form/Button";
import Timer from "../components/code/Timer";
import { MdSend } from "react-icons/md";
import { useUser } from "../context/UserContext";
import { useData } from "../context/DataContext";
import {
  getChallenge,
  handleSaveUserAnswer,
  handleSubmitAnswer,
} from "../helpers";
import CodeId from "../components/code/CodeId";

const Challenge = () => {
  const { user } = useUser();
  const { handleMessage } = useData();

  const query_ = useQuery();

  const [question, setQuestion] = useState<DocumentData | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState<number>(300);
  const [id, setId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (id) {
      const isCorrect = await handleSubmitAnswer(id, selectedOption);
      if (isCorrect !== null) {
        saveUserAnswer(isCorrect);
      }
    }
  };

  const saveUserAnswer = async (isCorrect: boolean) => {
    if (user) {
      if (question && id) {
        const userAnswer = {
          isCorrect: isCorrect,
          userId: user.uid,
          selectedAlternative: selectedOption,
          questionId: id,
          timeLeft: timer,
          challengeTime: question.timer,
          timestamp: Timestamp.now(),
        };

        console.log(userAnswer);
        const response = await handleSaveUserAnswer(userAnswer);
        if (userAnswer.isCorrect) {
          handleMessage(
            `Desafio: ${response.id}, finalizado. Resposta correta.`,
            "success"
          );
        } else {
          handleMessage(
            `Desafio: ${response.id}, finalizado. Resposta incorreta.`,
            "warning"
          );
        }
      }
    } else {
      handleMessage(
        `Você precisa estar logado, antes de realizar o desafio.`,
        "warning"
      );
    }
  };

  useEffect(() => {
    const id_ = query_.get("id");
    if (id_) {
      (async () => {
        const response = await getChallenge(id_);
        setQuestion(response);
      })();

      setId(id_);
    } else {
      setId(null);
    }

    return () => {};
  }, [query_]);

  if (question)
    return (
      <div style={{ marginTop: "22px" }}>
        <h2>{question.title}</h2>
        <p>Language: {question.language}</p>

        <CodeHighlighter code={question.code} language={question.language} />
        <br />

        <Timer timer={timer} setTimer={setTimer} />
        <hr />

        <p>Alternativas:</p>
        {question.alternatives.map((q: string, i: number) => (
          <div key={i}>
            <Alternative
              id={i.toString()}
              name="alternative"
              index={i + 1}
              selectedOption={selectedOption}
              value={(i + 1).toString()}
              setState={setSelectedOption}
              textValue={q}
            />
          </div>
        ))}
        <p>Resposta Selecionada: {selectedOption}</p>

        <Button icon={<MdSend />} onClick={handleSubmit}>
          Submit
        </Button>

        <br />

        <hr />

        {id && <CodeId id={id} />}
      </div>
    );
  else
    return (
      <div>
        <p>Not Found</p>
      </div>
    );
};

export default Challenge;
