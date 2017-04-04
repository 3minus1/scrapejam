# API Reference. 

This is the API Server that I wrote on NodeJS, to extract data from YouTube, Gaana, and Saavn.

You can refer to the following endpoints for API consumption.

**1) YouTube:**

`http://139.59.64.234:3000/api/yt/?url={Insert YouTube Video URL Here}`

**2) Gaana:**

`http://139.59.64.234:3000/api/gaana/?url={Insert Gaana Song URL Here}`

**3) Saavn:**

`http://139.59.64.234:3000/api/saavn/?url={Insert Saavn Song URL Here}`

***

### JSON Response:

{ 

  _"title":_ Song's Title,  

  _"description":_ Song's Description (Currently only YouTube's meta is up to date, so not fetching description for Gaana and Saavn,  

  _"thumbnail":_ The thumbnail URL for album artwork,  

  _"duration":_ Duration of the song. 

}

***
  
**_Note:_** For YouTube and Saavn, only their html metadata is being scraped, but for Gaana, the whole page is being scraped to get the correct DOM elements (Their metadata is not very useful).

  
