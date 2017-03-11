/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './subjectActions';
import { getSubjects } from './subjectSelectors';
import { SubjectShape } from '../../shapes';


export const injectSubjects = (WrappedComponent) => {
  class SubjectsContainer extends Component {
    static mapDispatchToProps = {
      fetchSubjects: actions.fetchSubjects,
    }

    static fetchData(props) {
      const { fetchSubjects } = props;
      fetchSubjects();
    }

    componentDidMount() {
      SubjectsContainer.fetchData(this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  SubjectsContainer.propTypes = {
    subjects: PropTypes.arrayOf(SubjectShape).isRequired,
    fetchSubjects: PropTypes.func.isRequired,
  };

  const mapStateToProps = state => ({
    subjects: getSubjects(state),
  });

  const getDisplayName = component => component.displayName || component.name || 'Component';


  SubjectsContainer.displayName = `InjectSubjects(${getDisplayName(WrappedComponent)})`;

  return connect(mapStateToProps, SubjectsContainer.mapDispatchToProps)(SubjectsContainer);
};
