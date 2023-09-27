import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDocById, getAllPaginatedDocs, getCountDocs } from "../helpers";
import { IQuestion } from "../helpers/type";
import Button from "../components/form/Button";
import { OrderByDirection } from "firebase/firestore";
import { MdDelete } from "react-icons/md";

const AllChallenges = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [language, setLanguage] = useState("java");
  const [order, setOrder] = useState<OrderByDirection | undefined>("desc");
  const [limit, setLimit] = useState(1);

  const [totalPerLimitDocs, setTotalPerLimitDocs] = useState(0);

  const getAllQuestions = async () => {
    const response2 = await getAllPaginatedDocs(language, limit, order);
    setQuestions(response2);
  };

  const handleRemoveDoc = async (id: string) => {
    try {
      await deleteDocById(id);
      const response = await getAllPaginatedDocs(language, limit, order);
      setQuestions(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestions();

    (async () => {
      setTotalPerLimitDocs((await getCountDocs()) / 3);
    })();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, order, limit]);
  return (
    <div>
      <h1>Todas as Questões</h1>
      <p>Aqui você encontra todos os desafios.</p>

      <div className="flex gap-1">
        <Button small onClick={() => setLimit(1)}>
          1 Itens
        </Button>
        <Button small onClick={() => setLimit(4)}>
          4 Itens
        </Button>
        <Button small onClick={() => setLimit(7)}>
          7 Itens
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
        <code>
          Query:{" "}
          {language + " | " + order + " | " + limit + " | " + totalPerLimitDocs}
        </code>
      </div>

      <hr />
      <div className="flex flex-column">
        {questions && questions.length > 0 ? (
          questions.map((item) => (
            <div className="question" key={item.id}>
              <Link to={`/challenge?id=${item.id}`}>
                <span>{item.title}</span>
              </Link>
              <div className="flex align-center gap-2">
                <span>{item.language}</span>
                <Button onClick={() => handleRemoveDoc(item.id)}>
                  <MdDelete />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>Not Found</p>
        )}
      </div>
    </div>
  );
};

export default AllChallenges;
