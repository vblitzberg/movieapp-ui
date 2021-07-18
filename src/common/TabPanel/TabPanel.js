import React from 'react';
import PropTypes from 'prop-types';
/**
 * This method is a wrapper to create a tab panel with provided children.
 *
 * @param {*} children children to render inside tab panel
 * @param {*} value value for current tab
 * @param {*} index index of current tab
 * @returns a tab panel with provided children elements.
 */
function TabPanel({ children, value, index }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
        >
            {value === index && (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
export default TabPanel;