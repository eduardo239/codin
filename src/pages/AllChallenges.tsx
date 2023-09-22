import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDocs } from "../helpers";
import { IQuestion } from "../helpers/type";

const AllChallenges = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const getAllQuestions = async () => {
    const response = await getAllDocs("");
    setQuestions(response);
  };

  useEffect(() => {
    getAllQuestions();

    return () => {};
  }, []);

  return (
    <div>
      <h1>Todas as Questões</h1>
      <p>Aqui você encontra todos os desafios.</p>

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
