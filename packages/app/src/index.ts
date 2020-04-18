import ReactDom from 'react-dom'
import { createElement as h } from 'react'
import 'antd/dist/antd.css'
import App from './app'

ReactDom.render(h(App), document.getElementById('app'))
