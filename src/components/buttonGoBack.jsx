import { CgArrowLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const ButtonGoBack = ({ dataInfo, id, type, hidden, name }) => {
  const navigate = useNavigate()
  function goBack() {
    navigate(-1);
  }

  return (
    <button
      data-info={dataInfo}
      name={name}
      hidden={hidden}
      type={type}
      id={id}
      className={"btn-go-back"}
      onClick={goBack}
    >
      <CgArrowLeft />
    </button>
  );
};

export default ButtonGoBack;
