/** @jsx jsx */
/** @jsxRuntime classic */

import { jsx } from '@emotion/react'

import PropTypes from 'prop-types'


import Styles from './style'

const OverlayComponent = (props) => {
    return (
        <div
            css={[Styles.root, props.style]}
        />
    )
}

OverlayComponent.propTypes = {
    style: PropTypes.object,
}


export default OverlayComponent






