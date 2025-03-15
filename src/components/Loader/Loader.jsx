import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <ClipLoader size={50} color={"#ff6600"} />
    </div>
  );
};

export default Loader;
