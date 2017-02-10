/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { take, call, put, select } from 'redux-saga/effects';
import { getLocale } from '../Locale/localeSelectors';
import { getArticle } from './articleSelectors';
import * as constants from './articleConstants';
import * as actions from './articleActions';
import * as api from './articleApi';

export function* fetchConvertedArticle(id) {
  try {
    const locale = yield select(getLocale);
    const article = yield call(api.fetchConvertedArticle, id, locale);
    yield put(actions.setConvertedArticle(article));
  } catch (error) {
    throw error;
    // TODO: handle error
    // yield put(actions.applicationError());
  }
}

function* watchFetchConvertedArticle() {
  while (true) {
    const { payload: id } = yield take(constants.FETCH_ARTICLE);
    const currentArticle = yield select(getArticle(id));
    if (currentArticle.id !== id) {
      yield call(fetchConvertedArticle, id);
    }
  }
}

export default [
  watchFetchConvertedArticle,
];
