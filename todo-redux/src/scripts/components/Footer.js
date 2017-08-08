import React from 'react';
import {VisibilityFilters} from '../constants';
import FilterLink from '../containers/FilterLink';

const Footer = () => {
    const {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} = VisibilityFilters;
    return (
        <p>
            Show: {' '}
            <FilterLink filter={SHOW_ALL}>All</FilterLink>
            {', '}
            <FilterLink filter={SHOW_ACTIVE}>Active</FilterLink>
            {', '}
            <FilterLink filter={SHOW_COMPLETED}>Completed</FilterLink>
        </p>
    );
}

export default Footer

