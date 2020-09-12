import React from 'react'
import { render } from 'react-dom'

//import theme from 'common/style/theme.css'

const App = props => {
  return <h1>GNE - Graphviz Network Explorer <span className="mu mu-arrow-left"></span></h1>
}

render(<App />, document.getElementById('react-root'))
