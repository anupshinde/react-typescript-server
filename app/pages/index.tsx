import * as React from 'react'
import { Component } from 'react'
import { Page } from '../components/page'
import axios from 'axios'


interface Props {
  stories: any[]
}
export default class Index extends Component<Props,{}> { 
  
  static async getInitialProps () {
    let toi_url = 'http://mfeeds.timesofindia.indiatimes.com/Feeds/jsonfeed?newsid=newsmldefault&format=simplejson'
    const resp = await axios.get(toi_url)
    return { stories: resp.data.NewsItem }
  }

  getItem(story) {
    let height = '300px';
    return (
      <div key={story.WebURL} className="col-xs-6" 
        style={{
          minHeight: height,
          maxHeight: height,
          overflow: 'hidden',
          marginBottom: '10px'
        }}>
        <h3>{story.HeadLine}</h3>
        <p>{story.DateLine}</p>
        <blockquote>{story.Caption}</blockquote>
      </div>
    )
  }

  render() {
    //console.log(this.props);
    //console.log("This is xyz", this.props.stories)
    let items = this.props.stories.map((story)=> this.getItem(story))
    
    return (
      <Page>
        {items}
      </Page>
    );
  }
} 