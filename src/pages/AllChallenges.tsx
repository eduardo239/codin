import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDocs } from "../helpers";
import { IQuestion } from "../helpers/type";
import Button from "../components/form/Button";
import { OrderByDirection } from "firebase/firestore";

const AllChallenges = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [language, setLanguage] = useState("");
  const [order, setOrder] = useState<OrderByDirection | undefined>("desc");

  const [limit, setLimit] = useState(10);

  const getAllQuestions = async () => {
    const response = await getAllDocs(language, order, limit);
    setQuestions(response);
  };

  useEffect(() => {
    getAllQuestions();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, order, limit]);

  return (
    <div>
      <h1>Todas as Questões</h1>
      <p>Aqui você encontra todos os desafios.</p>
      <div className="flex gap-1">
        <Button small onClick={() => setLimit(20)}>
          20 Itens
        </Button>
        <Button small onClick={() => setLimit(10)}>
          10 Itens
        </Button>
      </div>
      <br />

      <div className="flex gap-1">
        <Button small onClick={() => setOrder("asc")}>
          Asc
        </Button>
        <Button small onClick={() => setOrder("desc")}>
          Desc
        </Button>
      </div>
      <br />
      <div className="flex gap-1">
        <Button small onClick={() => setLanguage("")}>
          All
        </Button>
        <Button small onClick={() => setLanguage("javascript")}>
          Javascript
        </Button>
        <Button small onClick={() => setLanguage("java")}>
          Java
        </Button>
        <Button small onClick={() => setLanguage("python")}>
          Python
        </Button>
        <Button small onClick={() => setLanguage("c++")}>
          C++
        </Button>
        <Button small onClick={() => setLanguage("rust")}>
          Rust
        </Button>
        <Button small onClick={() => setLanguage("sql")}>
          SQL
        </Button>
      </div>

      <hr />
      <div>
        <code>Query: {language + " | " + order + " | " + limit}</code>
      </div>

      <hr />
      <div className="flex flex-column">
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
    </div>
  );
};

export default AllChallenges;
