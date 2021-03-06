/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  resolveJsonOrRejectWithError,
  apiResourceUrl,
  fetchWithAccessToken,
} from '../../util/apiHelpers';

const baseUrl = apiResourceUrl('/taxonomy/v1');

export const fetchTopics = (subjectId, locale, filter) =>
  fetchWithAccessToken(
    `${baseUrl}/subjects/${subjectId}/topics/?recursive=true&language=${locale}${
      filter ? `&filter=${filter}` : ''
    }`,
  ).then(resolveJsonOrRejectWithError);

export const fetchTopic = (topicId, locale) =>
  fetchWithAccessToken(`${baseUrl}/topics/${topicId}/?language=${locale}`).then(
    resolveJsonOrRejectWithError,
  );
