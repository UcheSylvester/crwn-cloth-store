import { takeEvery, call, put } from "redux-saga/effects";
import ShopActionsTypes from "./shop.types";

import {
  firestore,
  converCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  yield console.log("I am fired");

  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();

    const collectionsMap = yield call(converCollectionsSnapshotToMap, snapshot);

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  // dispatch(fetchCollectionsStart());

  // collectionRef
  //   .get()
  //   .then(snapshot => {
  //     console.log(snapshot);
  //     const collectionsMap = converCollectionsSnapshotToMap(snapshot);

  //     dispatch(fetchCollectionsSuccess(collectionsMap));
  //   })
  //   .catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionsTypes.FECTH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
