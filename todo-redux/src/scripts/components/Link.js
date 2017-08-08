import React from 'react';
import PropTypes from 'prop-types';

const Link = (props) => {
    const {active, children, onClick} = props;

    if (active) {
        return <span>{children}</span>
    }

    return (
        <a 
            href="#"
            onClick={(evt) => {
                evt.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link