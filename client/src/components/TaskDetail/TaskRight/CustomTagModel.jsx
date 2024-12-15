import React from "react";
import Model from "../../../components/Model";

const CustomTagModel = ({
  close,
  data,
  onChangeInput,
  onSubmit,
  colors,
  colorChoice,
  setColorChoice,
}) => {
  return (
    <Model close={close}>
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Nhãn nhiệm vụ"
            name="tag"
            value={data.tag}
            onChange={onChangeInput}
            required
          />
          <i className="bx bx-label"></i>
        </div>
        <div className="color-choice">
          <h3>Chọn màu: </h3>
          <ul>
            {colors.map((e, i) => (
              <li
                className={`bg-${e} ${colorChoice === e ? "active" : ""}`}
                key={i}
                onClick={() => setColorChoice(e)}
              >
                <i className="bx bx-check"></i>
              </li>
            ))}
          </ul>
        </div>
        <button>Cập nhật</button>
      </form>
    </Model>
  );
};

export default CustomTagModel;
