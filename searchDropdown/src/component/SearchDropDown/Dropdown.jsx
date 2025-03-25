import React, { useEffect, useState } from "react";
import {
  MdClear,
  MdKeyboardArrowDown,
} from "react-icons/md";
import "./DropDown.css";

const Dropdown = ({ data }) => {
  const [click, setClick] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState("");
  const [popoverTop, setPopoverTop] = useState(null);
  const [listData, setListData] = useState();

  useEffect(() => {
    setListData(data)
  }, [data])


  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase()

    const list = data.filter((item) => {
      return item.toLowerCase().includes(keyword);
    })

    setListData(list)
  }

  const resetSelectedItem = () => {
    setSelectedItemIndex("");
  }

  return (
    <>
      <div className="select-box-continer">
        <div className="open-select-box">
          <div className="select-text-con" onClick={(e) => {
          setClick(!click)
          setPopoverTop(e.currentTarget.offsetHeight)
        }
        }>
            <p
              className={`selected-txt ${selectedItemIndex !== "" && "active"
                }`}
            >
              {selectedItemIndex === ""
                ? "All Categories"
                : selectedItem}
            </p>
          </div>
          <div className={`select-icon-con ${click ? "active" : ""}`}>
            {selectedItemIndex === "" ?
              <MdKeyboardArrowDown className="icon" />
              :
              <MdClear className="icon" onClick={resetSelectedItem} />
            }

          </div>
        </div>


        <div className={`select-box ${click ? "active" : ""}`}>
          <div className="select-box-input-box">
            <input
              className="select-box-input"
              placeholder="Search hear..."
              onChange={filterList}
            />
          </div>
          <div className="select-box-content">
            {/* <div
              className={`select-box-item ${selectedItemIndex === "" ? "selected" : " "
                }`}
              onClick={(e) => {
                setClick(false);
                setSelectedItemIndex("");
              }}
            >
              All Categories
            </div> */}

            {
              listData &&
              listData.map((item, index) => (
                <div
                  key={index}
                  className={`select-box-item ${selectedItemIndex === index ? "selected" : " "
                    }`}
                  onClick={(e) => {
                    setClick(false);
                    setSelectedItem(item);
                    setSelectedItemIndex(index);
                  }}
                >
                  {item}
                </div>
              ))}
          </div>
        </div>

      </div >
    </>
  );
};

export default Dropdown;
