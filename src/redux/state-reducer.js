import {DATES_SORT, IS_ERROR_TOGGLE, IS_SPIN_TOGGLE } from "../data/constants";
import { town1, town2, town3, } from "../assets/index";

const initialState = {
  caruselImg: [
    {id: 1, img: town1},
    {id: 2, img: town2},
    {id: 3, img: town3},
    {id: 4, img: town1},
    {id: 5, img: town2},
    {id: 6, img: town3},
    {id: 7, img: town1},
    {id: 8, img: town2},
    {id: 9, img: town3},
  ],
  dates: [],
  isError: false,
  isSpin: false,
};

export const stateReducer = (state = initialState, action) => {
  switch (action.type) {

    case DATES_SORT:
      return { ...state, dates: action.payload };

      case IS_ERROR_TOGGLE:
      return { ...state, isError: action.value };

      case IS_SPIN_TOGGLE:
      return { ...state, isSpin: action.value };
    default:
      return state;
  }
};
