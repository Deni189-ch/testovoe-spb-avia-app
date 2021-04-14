import axios from "axios";
import { call, put, takeEvery } from "@redux-saga/core/effects";

import { setSpinAC } from "./actions";
import { DATES_SORT, DATES_SORT_SAGA } from "../data/types";


export function* sagaWatcher() {
  yield takeEvery(DATES_SORT_SAGA, sagaWorker);
}

function* sagaWorker(action) {
  try {
    yield put(setSpinAC(true))
    const payload = yield call(axiosDates, action.payload);
    
    yield put({ type: DATES_SORT, payload })
    yield put(setSpinAC(false))
  } catch (e) {
    console.log('axiosDates-error: ', e);
    //yield put(showAlert('что то пошло не так'))
    yield put(setSpinAC(false))
  }
}


const instance = axios.create({
  withCredentials: true,
  baseURL: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/`,
  headers: {
    'x-rapidapi-key': 'e6def4f6bfmsh6f5f1d244ce8274p1e211cjsn271e79144b15',
    'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
  }
});
 
async function axiosDates(dates) {
    const Url = `browsedates/v1.0/US/RUB/RUS/SVO/JFK/${dates}`;
    return await instance.get(Url)
    .then(function (res) {
      let response = res.data
      return response
    })
    .catch(function (error) {
      console.error(error);
    });
  };
 
