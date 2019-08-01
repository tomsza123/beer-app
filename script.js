const apiurl =  "https://api.punkapi.com/v2/beers/ ";

var request = new XMLHttpRequest()

request.open('GET', apiurl, true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach(beer => {
      console.log(beer.name)
    })
  } else {
    console.log('error')
  }
}

request.send()