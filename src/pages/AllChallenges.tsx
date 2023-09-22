import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../helpers/firebase";
import { Link } from "react-router-dom";

type IQuestion = {
  id: string;
  difficulty: number;
  code: string;
  title: string;
  language: string;
  alternatives: string;
};

const AllChallenges = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const getAllDocs = async () => {
    const q = query(collection(db, "question"));
    const querySnapshot = await getDocs(q);
    const array: IQuestion[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const dt = {
        id: doc.id,
        difficulty: doc.data().difficulty,
        code: doc.data().code,
        title: doc.data().title,
        language: doc.data().language,
        alternatives: doc.data().alternatives,
      };
      array.push(dt);
    });
    setQuestions(array);
  };

  useEffect(() => {
    getAllDocs();

    return () => {};
  }, []);

  return (
    <div>
      <h1>Todas as Questões</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem maxime,
        sed accusamus distinctio sit nihil, mollitia totam ea vel aspernatur
        quia earum nesciunt velit itaque, animi consequatur molestias officia
        sunt.
      </p>

      <hr />

      {questions && questions.length > 0 ? (
        questions.map((item) => (
          <Link
            to={`/challenge?id=${item.id}`}
            className="question"
            key={item.id}
          >
            <span>{item.title}</span>
            <span>{item.language}</span>
          </Link>
        ))
      ) : (
        <p>Not Found</p>
      )}
    </div>
  );
};

export default AllChallenges;
