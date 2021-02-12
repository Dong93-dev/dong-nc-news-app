import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class SortSelector extends Component {
  state = {
    sort_by: "date",
  };

  handleClick = (event) => {
    if (event.target.textContent === "order: high-low") {
      this.props.changeOrder("desc");
      event.target.textContent = "order: low-high";
    } else {
      this.props.changeOrder("asc");
      event.target.textContent = "order: high-low";
    }
  };

  handleSelect = (eventKey, event) => {
    let sort_by = "";
    if (eventKey === "created_at") sort_by = "date";
    if (eventKey === "comment_count") sort_by = "comments";
    if (eventKey === "votes") sort_by = "votes";
    this.setState({ sort_by }, () => {
      this.props.changeSortBy(eventKey);
    });
  };
  render() {
    return (
      <div className={`${this.props.blockName}__conditionblock`}>
        <div className={`${this.props.blockName}__orderbutton`}>
          <Button
            variant="primary"
            onClick={this.handleClick}
            size="md"
            className="articleslistblock__orderbutton"
          >
            order: low-high
          </Button>{" "}
        </div>
        {/* <SplitButton
          key="primary"
          id={`dropdown-split-variants-primary`}
          variant="primary"
          title="sort by: "
          size="md"
          className={`${this.props.blockName}__sortbydropdown`}
        > */}
        <DropdownButton
          id="dropdown-basic-button__sortbyselect"
          title={`sort by: ${this.state.sort_by}`}
        >
          <Dropdown.Item eventKey="created_at" onSelect={this.handleSelect}>
            date
          </Dropdown.Item>
          <Dropdown.Item eventKey="comment_count" onSelect={this.handleSelect}>
            comments
          </Dropdown.Item>
          <Dropdown.Item eventKey="votes" onSelect={this.handleSelect}>
            votes
          </Dropdown.Item>
        </DropdownButton>
        {/* /* </SplitButton> */}
      </div>
    );
  }
}

export default SortSelector;
