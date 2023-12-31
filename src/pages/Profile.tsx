import { useEffect, useState } from "react";
import Progress from "../components/ui/Progress";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../helpers/firebase";
import { useUser } from "../context/UserContext";
import { TUserAnswers } from "../helpers/type";
import {
  MdOutlineAvTimer,
  MdOutlineChecklist,
  MdOutlineDoneAll,
} from "react-icons/md";

const Profile = () => {
  const { user } = useUser();

  const [totalQuestions, setTotalQuestions] = useState<number>(45);
  const [userAnswers, setUserAnswers] = useState<TUserAnswers[]>([]);
  const [userCorrectAnswers, setUserCorrectAnswers] = useState<number>(0);
  const [userAverageTime, setUserAverageTime] = useState<number>(0);
  const [userTotalAnswers, setUserTotalAnswers] = useState<number>(0);

  const getAllDocs = async () => {
    if (user) {
      const q = query(
        collection(db, "user_answers"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      const array: TUserAnswers[] = [];
      querySnapshot.forEach((doc) => {
        const ua_ = {
          id: doc.id,
          timestamp: doc.data().timestamp,
          isCorrect: doc.data().correct,
          userId: doc.data().userId,
          questionId: doc.data().questionId,
          selectedAlternative: doc.data().alternative,
          timeLeft: doc.data().timer,
          challengeTime: doc.data().totalTimer,
        };

        array.push(ua_);
      });
      setUserAnswers(array);
      setUserTotalAnswers(array.length);
    }
  };

  const sumAllCorrectAnswers = () => {
    return userAnswers.reduce((acc, item) => acc + Number(item.isCorrect), 0);
  };

  const averageTime = () => {
    if (!Array.isArray(userAnswers) || userAnswers.length === 0) {
      return 0;
    }

    let totalTime = 0;

    for (const obj of userAnswers) {
      if (obj.challengeTime && obj.timeLeft) {
        const rest = obj.challengeTime - obj.timeLeft;
        totalTime += rest;
      }
    }
    const averageTime = totalTime / userAnswers.length;

    return averageTime;
  };

  useEffect(() => {
    getAllDocs();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setUserCorrectAnswers(sumAllCorrectAnswers());
    setUserAverageTime(averageTime());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswers]);

  return (
    <div>
      <h1>Perfil</h1>
      <p>
        username: <span>{user?.displayName || "username"}</span>
      </p>
      <p>
        email: <span>{user?.email}</span>
      </p>
      <p>
        user ID: <span>{user?.uid}</span>
      </p>
      <hr />

      <Progress
        icon={<MdOutlineChecklist />}
        title={`Respostas Corretas: ${userCorrectAnswers}`}
        value={userCorrectAnswers / userTotalAnswers}
      />

      <Progress
        icon={<MdOutlineDoneAll />}
        title={`Questões Finalizadas: ${userTotalAnswers}`}
        value={userTotalAnswers / totalQuestions}
      />

      <Progress
        icon={<MdOutlineAvTimer />}
        title={`Tempo médio ${userAverageTime.toFixed(2)} segundos.`}
        value={userAverageTime / 100}
      />
    </div>
  );
};

export default Profile;
