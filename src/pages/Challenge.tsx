import { useEffect, useState } from "react";

import { useQuery } from "../helpers/helper";
import CodeHighlighter from "../components/code/CodeHighlighter";
import { DocumentData, Timestamp } from "firebase/firestore";
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
  const [selectedAlternative, setSelectedAlternative] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(9999);
  const [questionId, setQuestionId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (questionId) {
      const isCorrect = await handleSubmitAnswer(
        questionId,
        selectedAlternative
      );
      if (isCorrect !== null) {
        saveUserAnswer(isCorrect);
      }
    }
  };

  const saveUserAnswer = async (isCorrect: boolean) => {
    if (user) {
      if (question && questionId) {
        const userAnswer = {
          isCorrect,
          userId: user.uid,
          selectedAlternative,
          questionId,
          timeLeft,
          challengeTime: question.timer,
          timestamp: Timestamp.now(),
        };

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
        if (response) setTimeLeft(response.timer);
      })();
      setQuestionId(id_);
    } else {
      setQuestionId(null);
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

        <Timer timer={timeLeft} setTimer={setTimeLeft} />
        <hr />

        <p>Alternativas:</p>
        {question.alternatives.map((q: string, i: number) => (
          <div key={i}>
            <Alternative
              id={i.toString()}
              name="alternative"
              index={i + 1}
              selectedOption={selectedAlternative}
              value={(i + 1).toString()}
              setState={setSelectedAlternative}
              textValue={q}
            />
          </div>
        ))}
        <p>Resposta Selecionada: {selectedAlternative}</p>

        <Button icon={<MdSend />} onClick={handleSubmit}>
          Submit
        </Button>

        <br />
        <hr />

        {questionId && <CodeId id={questionId} />}
      </div>
    );
  else
    return (
      <div>
        <p>Desafio não encontrado.</p>
      </div>
    );
};

export default Challenge;
