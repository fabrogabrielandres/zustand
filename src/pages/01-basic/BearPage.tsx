import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../store/bears/bears.Store";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears></BlackBears>

        <PolarBears></PolarBears>

        <PandaBears></PandaBears>

        <DoNothing></DoNothing>
      </div>
    </>
  );
};



const BlackBears = () => {
  const blackBears = useBearStore((state) => state.blackBears);
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

const PandaBears = () => {
  const pandaBears = useBearStore((state) => state.pandaBears);
  const increasePandaBears = useBearStore((state) => state.increasePandaBears);
  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => increasePandaBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

const PolarBears = () => {
  const polarBears = useBearStore((state) => state.polarBears);
  const increasePolarBears = useBearStore((state) => state.increasePolarBears);
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button onClick={() => increasePolarBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};


export const DoNothing = () => {

  const  bears = useBearStore(useShallow((state)=> state.bears)) 
  const  DoNothing = useBearStore((state)=> state.doNothing) 
  const  AddBers = useBearStore((state)=> state.addBers) 
  const  ClearBers = useBearStore((state)=> state.clearBers) 
  return (
    <WhiteCard centered>
    <h2>Osos Negros</h2>
    <button onClick={()=>DoNothing()}>DoNothing</button>
    <button onClick={AddBers} className="m-3">AddBers</button>
    <button onClick={ClearBers} className="m-3">ClearBers</button>

    <div className="flex flex-col md:flex-row">
      <pre>
        { JSON.stringify(bears,null, 2) }
      </pre>
    </div>
  </WhiteCard>
  )
}
