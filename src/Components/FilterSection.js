import React from 'react'
import styled from 'styled-components';
import { useFilterContext } from '../Context/filterContext';
import { FaCheck } from 'react-icons/fa';
import FormatPrice from "../Helpers/FormatPrice"
import {Button} from "./Styles/Button"

const FilterSection = () => {

  const {filters:{text, category, company, color, price, minPrice, maxPrice}, all_products, updateFilterValue, clearFilters} = useFilterContext()


  // ^good practice of getting unique values
  // to get the unique data of each fields
  const getUniqueData = (data,property)=>
  {
    let newVal = data.map((curElem)=>
    {
      return curElem[property]; 
    })



    // ~ old method
    // if(property === "colors")
    // {
      // return (newVal = ["all", ...new Set([].concat(...newVal))]);   //* first we take all colors array and merge into one array and using Set method we remove the duplicates from that array...
    // }
    // else
    // {
      // return (newVal = ["all", ...new Set(newVal)])     //* to remove duplicates or to get unique data we use Set method
    // }

    // ~ new method
    if(property === "colors")
    {
      newVal = newVal.flat();  //* it removes all the brackets from the array upto one level and below in set method it removes all duplicates
    }
      
    return (newVal = ["all", ...new Set(newVal)])




    // console.log(newVal);   //* u get all the list of categories
  }
  // we need unique data
  const categoryData = getUniqueData(all_products,"category")
  const companyData = getUniqueData(all_products,"company")
  const colorsData = getUniqueData(all_products,"colors")


  // ^ bad practice because for different property like company,color,category,...etc you should create again another function
  //~ to get the unique data of each fields
  // const getUniqueData = (data)=>
  // {
  //   let newVal = data.map((curElem)=>
  //   {
  //     return curElem.category;      //*return curElem.company  (like this for every property u need to write) 
  //   })
  //   console.log(newVal);
  // }
  //~ we need unique data
  // const categoryData = getUniqueData(all_products)

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={updateFilterValue}>
                {curElem}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3> 

        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onClick={updateFilterValue}>
            {companyData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="company">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filter-colors colors">
        <h3>Colors</h3>

        <div className="filter-color-style">
          {colorsData.map((curColor, index) => {
            if(curColor === "all")
            {
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                  className='color-all--style'
                  onClick={updateFilterValue}>
                  all
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={updateFilterValue}>
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        <p> <FormatPrice price={price} /> </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue} />
      </div>

      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection