
import { Circles } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <Circles color="#3f51b5" height={80} width={80} />
    </div>
  );
};

export default Loader;
