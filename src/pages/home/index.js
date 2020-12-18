/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react'

import {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";


import { Collapse, CssBaseline } from '@material-ui/core'

import HeaderComponent from '../../components/Header'
import OverlayComponent from '../../components/overlay'

import Button from '@material-ui/core/Button';


import Styles from './style'

const HomePage = () => {
    const history = useHistory();
    const [state, setState] = useState({
        isAnimationPlayed: false,
    })

    useEffect(() => {
        setState({
            isAnimationPlayed: true,
        })
    }, [])

    const onNavigateToPlay = () => {
        history.push("/play");

    }

   
    const titleRenderer = () => {
        return (
            <Collapse
                css={ Styles.animation }
                in={ state.isAnimationPlayed }
                { ...(
                    state.isAnimationPlayed
                        ? {timeout: 1000}
                        : {}
                    ) 
                }
                collapsedHeight={100}
            >
                <div css={Styles.titleContainer}>
                    <h1 css={Styles.title}>
                    Poké<span css={Styles.titleColor}>Catch</span>.
                    </h1>
                    <h3 css={Styles.subTitle}>
                    Gotta <span css={Styles.titleColor}>catch</span> em' all!
                    </h3>
                    <Button
                        variant="contained" 
                        color="primary"
                        css={Styles.button}
                        onClick={ onNavigateToPlay }
                    >
                        Play!
                    </Button>
                </div>
            </Collapse>
        )
    }


    return (
        <div>
            <div
                css={Styles.root}
            >
                <CssBaseline/>
                <HeaderComponent/>
                <OverlayComponent/>
                {titleRenderer()}
            </div>
        </div>
    )
}

export default HomePage
