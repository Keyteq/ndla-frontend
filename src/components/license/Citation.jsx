/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { uuid } from 'ndla-util';
import formatDate from '../../util/formatDate';
import { injectT } from '../../i18n';

const Citation = ({ ...props }) => {
  const { article, t } = props;
  const citation = {
    authors: article.copyright.authors.map(author => author.name).join(', '),
    created: article.created,
    place: 'Oslo',
    title: article.title,
    year: article.created,
    today: formatDate(new Date()),
    uri: window.location.href,
  };

  const citeMap = (citationBody) => {
    const { authors, created, place, title, year, today, uri } = citationBody;
    const citationStyles = [
      {
        name: 'MLA',
        format: (<span>{authors}. {year}. &laquo;{title}&raquo;. <em>Nasjonal Digital Læringsarena</em>. Lest {today}. {uri}</span>),
      },
      {
        name: 'Harvard',
        format: (<span>{authors} ({year}) <em>{title}</em> [Internett]. {place}: Nasjonal Digital Læringsarena. Tilgjengelig fra: {uri} [Lest {today}].</span>),
      },
      {
        name: 'Chicago',
        format: (<span>{authors}. &laquo;{title}&raquo;. {created}. Nasjonal Digital Læringsarena. Internett. &lt;{uri}&gt; {today}.</span>),
      },
    ];
    return citationStyles;
  };

  return (
    <div>
      <p>{t('license.tabs.citation.explaination')}
      </p>
      {citeMap(citation).filter(style => style.name === 'Chicago').map(style =>
        <div key={uuid()}>
          <div className="c-bodybox">{style.format}</div>
        </div>)}
      <p>Vil du vite mer om referanser og hvordan man siterer kan du <a href="http://sokogskriv.no">gå til Søk & Skriv</a>.</p>
    </div>
  );
};

Citation.propTypes = {
  article: PropTypes.object.isRequired,
};

export default injectT(Citation);
