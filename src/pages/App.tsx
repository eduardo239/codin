import { collection, addDoc } from "firebase/firestore";
import { db } from "../helpers/firebase";

function App() {
  const first = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      The premium network for production, high-performance applications.
      Experience 30-50% faster response time and more global POPs, backed by a
      99.99% uptime SLA. Includes DDoS mitigation and six times the bandwidth as
      our standard network.
    </>
  );
}

export default App;
