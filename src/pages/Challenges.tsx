import { useEffect, useState } from "react";
import { deleteDocById, getAllPaginatedDocs, getCountDocs } from "../helpers";
import { IQuestion } from "../helpers/type";
import Button from "../components/form/Button";
import { OrderByDirection } from "firebase/firestore";
import ChallengeItem from "../components/challenge/ChallengeItem";
import LanguageList from "../components/challenge/LanguageList";

const AllChallenges = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [language, setLanguage] = useState("");
  const [order, setOrder] = useState<OrderByDirection | undefined>("desc");
  const [limit, setLimit] = useState(1);

  const [totalPerLimitDocs, setTotalPerLimitDocs] = useState(0);

  const getAllQuestions = async () => {
    const response = await getAllPaginatedDocs(language, limit, order);
    setQuestions(response);
  };

  const handleRemoveChallenge = async (id: string) => {
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
        <LanguageList setLanguage={setLanguage} />
      </div>

      <hr />
      <div>
        <code>
          Busca:{" "}
          {language + " | " + order + " | " + limit + " | " + totalPerLimitDocs}
        </code>
      </div>

      <hr />
      <div className="flex flex-column">
        {questions && questions.length > 0 ? (
          questions.map((item) => (
            <div key={item.id}>
              <ChallengeItem
                id={item.id}
                title={item.title}
                language={item.language}
                handleRemoveChallenge={handleRemoveChallenge}
              />
            </div>
          ))
        ) : (
          <p>Nenhum desafio encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default AllChallenges;
