# Server rendered web pages with React and TypeScript


## Usage

```
npm install
typings install
gulp
```

```
open http://localhost:8080
```


## Adding pages

Export a valid default React component from a new file in ```app/pages/...```

To fetch props for React componet, define a method ```getInitialProps```. For example:

```
static async getInitialProps () {
	let stories_url = '....'
	const resp = await axios.get(toi_url)
	return { stories: resp.data.NewsItem }
}
```

