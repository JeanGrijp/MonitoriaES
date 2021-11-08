import { useContext, useEffect } from "react";
import { CountContext } from "../../context/CountContext";

function Count () {
  const {count, setcount} = useContext(CountContext)

  useEffect(() => {
    console.log('a variável de estado count mudou, ativando o useEffect')
  }, [count])

  return (
    <>
      <h1>
          contador: {count}
      </h1>
      <button onClick={() => setcount(count + 1)}>incrementar</button>
      <button onClick={() => setcount(count - 1)}>decrementar</button>
    </>
  )
}

export default Count;