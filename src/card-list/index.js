import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";
export default class CardList extends Component {
  constructor(props) {
    super(props);

    this._nodes = new Map();
  }
  isSelected(index) {
    if (this.props.selectedItem === index) return true;
    return false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedItem !== this.props.selectedItem) {
      const node = this._nodes.get(this.props.selectedItem);
      if (node) {
        ReactDOM.findDOMNode(node).scrollIntoView({
          block: "end",
          behavior: "smooth"
        });
      }
    }
  }

  mouseEnter = (index)=>{  
    this.props.mouseEnter(index)
  }

  blueWord(sentance){
    return sentance.replace(new RegExp(this.props.searchText, 'ig'), `<span style="color:rgb(86,138,238);">${this.props.searchText}</span>`);
  }
  render() {
    let { items } = this.props;
    
    return (
      <div className="card-list">
        {this.props.searchText!=='' && items.length<1 ?(<div className="item-no-result">No User Found</div>) :""}
        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${this.isSelected(index) ? "item-selected" : ""}`}
            ref={element => this._nodes.set(index, element)}
            onMouseEnter={this.mouseEnter.bind(this,index)}
          >
            
            <div className="item-id" dangerouslySetInnerHTML={{ __html: this.blueWord(item.id) }}></div>
            <div className="item-name" dangerouslySetInnerHTML={{ __html: this.blueWord(item.name) }}></div>

            {item.items.toString().toLowerCase().indexOf(this.props.searchText.toLowerCase())!==-1 ?<div className="item-items">{`"${this.props.searchText}" found in items`}</div> :null}
            
            <div className="item-address" dangerouslySetInnerHTML={{ __html: this.blueWord(item.address +", "+item.pincode) }}></div>
            
          </div>
        ))}
      </div>
    );
  }
}
