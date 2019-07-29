import React from 'react'
import ReactDOM from 'react-dom'
import largeNumberCc from 'large-number-cc'
import './search.less'
class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      Text: null
    }
  }
  
  loadComponent () {
    import('./text.js').then((Text) => {
      console.log(Text)
      this.setState({
        Text: Text.default
      })
    })
  }
  render () {
    // const { Text } = this.state
    console.log(largeNumberCc('1', '999'))
    const addResult = largeNumberCc('999', '11');
    return ( <div onClick={() => { this.loadComponent() }} className="search">{ addResult }</div> )
  }
}

ReactDOM.render(
  <Search></Search>,
  document.getElementById('root')
)