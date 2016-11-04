import * as React from 'react'
import { Component } from 'react'

export class Page extends Component<{},{}> {
  render() {
    return(
      <html>
        <head>
          <link rel="stylesheet" href="/static/lib/vendor.css"/>
        </head>
        <body>
          { this.props.children }
        </body>
      </html>
    )
  }
} 