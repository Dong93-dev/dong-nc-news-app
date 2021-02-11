import React from "react";
import Button from "react-bootstrap/Button";
import SplitButton from "react-bootstrap/SplitButton";
import Dropdown from "react-bootstrap/Dropdown";

function ConditionQuery(props) {
  const handleChange = (event) => {
    props.changeSortBy(event.target.value);
  };

  const handleClick = (event) => {
    if (event.target.textContent === "order: high-low") {
      props.changeOrder("desc");
      event.target.textContent = "order: low-high";
    } else {
      props.changeOrder("asc");
      event.target.textContent = "order: high-low";
    }
  };

  const handleSelect = (eventKey, event) => {
    props.changeSortBy(eventKey);
  };

  return (
    <div className={`${props.blockName}__conditionblock`}>
      <div className={`${props.blockName}__orderbutton`}>
        <Button variant="primary" onClick={handleClick} size="lg">
          order: low-high
        </Button>{" "}
      </div>
      <SplitButton
        key="primary"
        id={`dropdown-split-variants-primary`}
        variant="primary"
        title="sort by"
        size="lg"
        className={`${props.blockName}__sortbydropdown`}
      >
        <Dropdown.Item eventKey="created_at" onSelect={handleSelect} active>
          Date
        </Dropdown.Item>
        <Dropdown.Item eventKey="comment_count" onSelect={handleSelect}>
          Comments
        </Dropdown.Item>
        <Dropdown.Item eventKey="votes" onSelect={handleSelect}>
          votes
        </Dropdown.Item>
      </SplitButton>
    </div>
  );
}

export default ConditionQuery;
