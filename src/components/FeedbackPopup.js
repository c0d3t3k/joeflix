import React from 'react'
//import {useRecoilState} from 'recoil'
import {useAtom} from 'jotai'

import './FeedbackPopup.css'
import feedbackState from '../atoms/feedbackState.js'

function FeedbackPopup() {
	//const [feedback, setFeedback] = useRecoilState(feedbackState)
	const [feedback, setFeedback] = useAtom(feedbackState)
	
	const closePopup = () => {	
		setFeedback({isVisible: false})
	}

    return (
        <div className={`fbp ${feedback.isVisible ? 'fbp--visible' : ''}`}>
        	<span className="fbp__close" onClick={() => closePopup()}>×</span>
        	<span className="fbp__message">{feedback.message}</span>
        </div>
    )
}

export default FeedbackPopup
