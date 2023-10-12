import { useEffect, useState } from "react";
import { deleteDocById, getAllPaginatedDocs } from "../helpers";
import { IQuestion } from "../helpers/type";
import Button from "../components/form/Button";
import { OrderByDirection } from "firebase/firestore";
import ChallengeItem from "../components/challenge/ChallengeItem";
import LanguageList from "../components/challenge/LanguageList";
import { useData } from "../context/DataContext";

const AllChallenges = () => {
  const { totalQuestions } = useData();

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [language, setLanguage] = useState("");
  const [order, setOrder] = useState<OrderByDirection | undefined>("desc");
  const [limit, setLimit] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

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

  const paginationButtons = () => {
    return Array.from(Array(Math.round(Math.round(totalQuestions))), (v, k) => {
      return (
        <Button key={k} small onClick={() => setLimit(k + 1)}>
          {k + 1}
        </Button>
      );
    });
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
      <p>Total de desafios: {totalQuestions}</p>

      <div className="flex gap-1">{paginationButtons()}</div>
      <br />
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
          {"L " +
            language +
            " | O " +
            order +
            " | L " +
            limit +
            " | IPP " +
            itemsPerPage}
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
