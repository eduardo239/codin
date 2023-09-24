import { useEffect, useState } from "react";

import { useQuery } from "../helpers/helper";
import CodeHighlighter from "../components/code/CodeHighlighter";
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../helpers/firebase";
import Alternative from "../components/form/Alternative";
import Button from "../components/form/Button";
import Timer from "../components/code/Timer";
import { MdSend } from "react-icons/md";
import { useUser } from "../context/UserContext";
import { useData } from "../context/DataContext";

const Challenge = () => {
  const { user } = useUser();
  const { handleMessage } = useData();

  const query_ = useQuery();

  const [question, setQuestion] = useState<DocumentData | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [code, setCode] = useState<string>(``);
  const [correct, setCorrect] = useState<null | boolean>(null);
  const [timer, setTimer] = useState<number>(300);

  const getData = async (id: string) => {
    const docRef = doc(db, "question", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setQuestion({ id: docSnap.id, ...docSnap.data() });
      setCode(`${docSnap.data().code}`);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handleSubmit = async () => {
    const id = query_.get("id");

    if (selectedOption && id) {
      const q = query(collection(db, "answer"), where("questionId", "==", id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const c = parseInt(selectedOption) === doc.data().correct;
        setCorrect(c);
        saveUserAnswer(c);
      });
    }
  };

  const saveUserAnswer = async (c: boolean) => {
    if (user && question) {
      const queRef = await addDoc(collection(db, "user_answers"), {
        correct: c,
        userId: user.uid,
        alternative: selectedOption,
        timestamp: Timestamp.now(),
        questionId: question.id,
        timer,
        totalTimer: question.timer,
      });

      handleMessage(`Desafio salvo com sucesso, ID: ${queRef.id}`, "error");
    }
  };

  useEffect(() => {
    const q = query_.get("id");
    if (q) getData(q);

    return () => {};
  }, [query_]);

  if (question)
    return (
      <div>
        <h2>{question.title}</h2>
        <p>Language: {question.language}</p>
        <hr />
        <CodeHighlighter code={code} language={question.language} />

        <hr />
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
        {correct != null && (
          <div>
            <p>Resposta: {correct ? "Correta" : "Errada"}</p>
          </div>
        )}

        <hr />
        <small>
          <code> Challenge ID: {query_.get("id")}</code>
        </small>
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
