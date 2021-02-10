import React from "react";

function ConditionQuery(props) {
  const handleChange = (event) => {
    props.changeSortBy(event.target.value);
  };

  const handleClick = (event) => {
    if (event.target.textContent === "high-low") {
      props.changeOrder("desc");
      event.target.textContent = "low-high";
    } else {
      props.changeOrder("asc");
      event.target.textContent = "high-low";
    }
  };

  return (
    <div className={`${props.blockName}__conditionblock`}>
      <label className={`${props.blockName}__conditionblock__label`}>
        order{" "}
        <button
          className={`${props.blockName}__conditionblock__order`}
          onClick={handleClick}
        >
          low-high
        </button>
      </label>
      <label className={`${props.blockName}__conditionblock__label`}>
        sort by{" "}
        <select
          name="sort_by"
          className={`${props.blockName}__conditionblock__select`}
          onChange={handleChange}
        >
          {Object.entries(props.selectOptions).map(([value, text]) => {
            return (
              <option value={value} key={value}>
                {text}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}

export default ConditionQuery;
