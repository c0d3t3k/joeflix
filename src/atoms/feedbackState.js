//import {atom} from 'recoil'
import {atom} from 'jotai'

// const feedbackState = atom({
//     key: 'feedbackState',
//     default: {isVisible: false, message: ''}
// })

const feedbackState = atom(
    {isVisible: false, message: ''}
)

export default feedbackState