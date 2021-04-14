import { IS_ERROR_TOGGLE, IS_SPIN_TOGGLE } from "../data/types";


 export const setToggleErrorAC = value => ({ type: IS_ERROR_TOGGLE, value });

 export const setSpinAC = value => ({ type: IS_SPIN_TOGGLE, value });