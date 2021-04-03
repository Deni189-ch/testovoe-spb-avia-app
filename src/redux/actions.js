import { IS_ERROR_TOGGLE, IS_SPIN_TOGGLE } from "../data/constants";


 export const setDatesAC = (value) => ({ type: IS_ERROR_TOGGLE, value });

 export const setSpinAC = (value) => ({ type: IS_SPIN_TOGGLE, value });
































// export function showPersonList(data) {
//   return (dispatch) => {
//     dispatch({ type: SHOW_PERSONS_LIST, data });
//   };
// }

// Carriers: (2) [{…}, {…}]
// Currencies: [{…}]                    НЕ НУЖЕН
// Dates: {OutboundDates: Array(1)}
// Places: (2) [{…}, {…}]
// Quotes: (2) [{…}, {…}]
// __proto__: Object




// Carriers: Array(2)
// 0: {CarrierId: 1717, Name: "Aeroflot"}
// 1: {CarrierId: 1375, Name: "LOT"}