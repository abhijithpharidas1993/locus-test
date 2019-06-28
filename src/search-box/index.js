import React, { Component } from "react";
import CardList from "../card-list";
import './style.css';

const items = [
  {
    id: "123-s2-546",
    name: "John Jacobs",
    items: ["bucket", "bottle"],
    address: "1st Cross, 9th Main, abc Apartment",
    pincode: "5xx012"
  },
  {
    id: "123-s3-146",
    name: "David Mire",
    items: ["Bedroom Set"],
    address: "2nd Cross, BTI Apartment",
    pincode: "4xx012"
  },
  {
    id: "223-a1-234",
    name: "Soloman Marshall",
    items: ["bottle"],
    address: "Riverbed Apartment",
    pincode: "4xx032"
  },
  {
    id: "121-s2-111",
    name: "Ricky Beno",
    items: ["Mobile Set"],
    address: "Sunshine City",
    pincode: "5xx072"
  },
  {
    id: "123-p2-246",
    name: "Sikander Singh",
    items: ["Air Conditioner"],
    address: "Riverbed Apartment",
    pincode: "4xx032"
  },
  {
    id: "b23-s2-321",
    name: "Ross Wheeler",
    items: ["Mobile"],
    address: "1st Cross, 9th Main, abc Apartement",
    pincode: "5xx012"
  },
  {
    id: "113-n2-563",
    name: "Ben Bish",
    items: ["Kitchen Set", "Chair"],
    address: "Sunshine City",
    pincode: "5xx072"
  },
  {
    id: "323-s2-112",
    name: "John Michael",
    items: ["Refrigerator"],
    address: "1st Cross, 9th Main, abc Apartement",
    pincode: "5xx012"
  },
  {
    id: "abc-34-122",
    name: "Jason Jordan",
    items: ["Mobile"],
    address: "Riverbed Apartment",
    pincode: "4xx032"
  }
];
export default class SearchBox extends Component {
  state = {
    value: "",
    selected: -1,
    mouseActive:false
  };

  itemKeyDown = e => {
    this.setState({ mouseActive:false});
    const filterdItem = items.filter(this.filter);
    if (e.keyCode === 40 && filterdItem.length - 1 > this.state.selected) {
      this.setState({ selected: this.state.selected + 1 });
    } else if (e.keyCode === 38 && this.state.selected >= 0) {
      this.setState({ selected: this.state.selected - 1 });
    }
  };
  handleChange = e => {
    this.setState({ value: e.target.value, selected: -1 });
  };

  mouseEnter = index => {
    if(this.state.mouseActive){
        this.setState({ selected: index });
    }
    
  };

  mouseMove = ()=>{
    this.setState({ mouseActive:true});
  }
  filter = ({ id, name, address, pincode, items }) => {
    if (this.state.value !== "") {
      return (
        name.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1 ||
        id.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1 ||
        address.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1 ||
        pincode.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1 ||
        items
          .toString()
          .toLowerCase()
          .indexOf(this.state.value.toLowerCase()) !== -1
      );
    }
    return false;
  };
  render() {
    const filterdItem = items.filter(this.filter);
    return (
      <div className="search-wrapper" onMouseMove ={this.mouseMove}>
          <div className="input-wrapper">
          <i class="fas fa-search"></i>
          <input
            className="search-box"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.itemKeyDown}
            placeholder="Search by user id,address ,name.."
            />
          </div>
        
        <CardList
          items={filterdItem}
          selectedItem={this.state.selected}
          mouseEnter={this.mouseEnter}
          searchText={this.state.value}
        />
      </div>
    );
  }
}
