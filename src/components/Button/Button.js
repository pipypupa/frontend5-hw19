
import "./Button.css";

const Button = ({ onClick }) => {
  return (
    <button className="load-more" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
