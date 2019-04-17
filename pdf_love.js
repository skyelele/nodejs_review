// Adding command options

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      descrive: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    console.log('Title: ' + argv.title);
    console.log('Body: ' + argv.body);
  }
})

// node app.js add --title="Buy" --body="Note body here"
// TItle: Buy
// Body: Note body here

// Arrow functions

const event = {
  name: 'Birthday party',
  guestList: ['Andrew', 'Jen', 'Mike'],
  printGuestList() {
    console.log('Guest list for ' + this.name);

    this.guestList.forEach((guest) => {
      console.log(guest + ' is attending ' + this.name);
    });
  }
}

event.printGuestList()

// Array Find method

const users = [{
  name: 'Andrew Mead',
  age: 27
},{
  name: 'George Hudson',
  age: 72
},{
  name: 'Clay Klay',
  age: 45
}]

const user = users.find((user) => user.name === 'Geoerge Hudson');

console.log(user) // will print the 2nd object in the array

// Debugging Node.js
// Node debugger

// Printing values to the console with console.log is a good start, but there are often time where we need a more complete debugging solution. For that, Node.js ships with a built-in debugger. It builds off of the dveloper tools that CHroms and V8 use when debugging JS code in the browser.

node inspect app.js

chrome://inspect


// Asynchronous Basics

setTimeout(()=> {
  console.log('2 second timer');
}, 2000);

// Making HTTP Requests

const request = require('request');

const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,122.4233'

request({ url: url }, (error, response) => {
  // Parse the response body from JSON string into JS object
  const data = JSON.parse(response.body)

  // WIll print the current temp to console
  console.log(data.currently.temperature)
});

// Customizing HTTP requests

const request = require('request') 
 
const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,122.4233' 
 
request({ url: url, json: true }, (error, response) => {     console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.') })

// Callback functions

// Cb functions are at the core of asynchronous development. WHen you perform an asynchronous operation, you'll provide Node with a callback function. Node will then call the callback when the async operation is complete. THIs is how you get access to the results of the async operation, whether it's an HTTP request for JSON data or a query to a database for a user's profile.

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0
    }
    
    callback(data)
  }, 2000)
}

geocode('Philadelphia', (data) => {
  console.log(data)
})

// Callback absatraction

// Callback functions can be used to abstract complex asynchronous code into a simlpe reusable function. In this lesson, you'll learn how to use this pattern to create a reusable function for geocoding an address.

const request = require('request');

const request = require('request') 
 
const geocode = (address, callback) => {     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcn J4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1' 
 
    request({ url: url, json: true }, (error, response) => {         if (error) {             callback('Unable to connect to location services!', undefined)         } else if (response.body.features.length === 0) {             callback('Unable to find location. Try another search.', undefined)         } else {             callback(undefined, {                 latitude: response.body.features[0].center[0],                 longitude: response.body.features[0].center[1],                 location: response.body.features[0].place_name             })         }     }) } 
 
module.exports = geocode;

// Destructuring

const user = {
  name: 'Andrew',
  age: 27,
  location: "NYC"
}

const [ age, location:address ] = user

// Destructuring function arguments

// Destructuring works with function parameters as well. If an object is passed into a function, it can be structured inside the function definition.  You can see this in the transaction function bellow. The function acceptes an object as its second argument. THe label and stock properties have both been destructured into standalone variables that become available in the function.

const product = {     label: 'Red notebook',     price: 3,     stock: 201,     salePrice: undefined,     rating: 4.2 } 
 
const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
}

transaction('order', product);

// HTTPS requests without a library

const https = require('https')
const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/40,-75' 

const request = https.request(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data = data + chunk.toString();
  })

  response.on('end', () => {
    const body = JSON.parse(data);
    console.log(body)
  })

})

request.on('error', (error) => {
  console.log('An error', error);
})

request.end();

// Express TIME :) :D <3

const express = require('express');
const app = express();

app.get('', (req, res) => {
  res.send("Hello express!");
})

app.get('/weather', (req, res) => {
  res.send('Your weather');
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
})

// Static Assets

// Express can serve up all the assets needed for your website. THis includes HTML, CSS, JS, Images, and more. In this lesson, you'll learn how to serve up an entire di with Express

// Serve up a static directory
// The below uses Node's path podule to generate the absolute path. THe call to path.join allows you to manipulate a path by providing individual path segments. It starts with __dirname which is the directory path for the current script. From there, the second segment moves out of the src folder and into the public directory.

// The path is then provided to express.statis as shown below.

const path = requrie('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
  res.send({
    forecase: 'It is snowing',
    location: 'Philadelphia'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})

// Use express server to serve up a webpage with images, styles and scripts

// Dynamic pages with templating


// Handlebars templating engine

// Install handle bars
// From there you'll need to use app.set to set a value for the 'view engine' config option. THe value is the name of the template engine module you installed. That's hbs.

app.set('view engine', 'hbs');

// REnder handlebars templates

// // By default, express expects your views to live in a views directory inside of your project root. You'll learn how to customize the location and dir name in the next lesson.

// Below is an example of the handlebars view in view/index.hbs. This looks like a normal HTML document with a few new features. Notice {{title}} and {{name}}. THIs is a handlerbars syntax which allows you to inject variables inside of the template. THis is what allows you to generate dynamic pages.

// Now, after inserting {{}} in the HTML, you can render the
// template. THIs is done by defining a new route and calling res.render with the template name. The '.hbs' file extension can be left off. THe 2nd argument is an object that contains all the vaiables the template should have access to when rendering. THis is where values are provided for title and name.

app.get('', (req, res) => {
  // index.hbs file rendered :)
  res.render('index', {
    title: 'My title',
    name: 'Skye Leahy'
  })
})

app.get('', (req, res) => {
  res.render('index', {
    title: 'My title',
    name: 'Andrew Mead'
  })
})

// Customizing the views directory

// You can customize the location of the views directory by providing express with the new path. Call app.set to set a new value for the 'views' option. THe example below configures Express to look for views in templates/views/.

const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

// advanced templating

// In this lesson, you'll learn how to work with handlerbars partials. As the name suggests, partials are just part of a web page. Partials are great for things you need to show on multiple pages like headers, footers, and navigation bars.

// Setting up partials

// You can use partials by telling handlebars where you'd like to store them. THis is done with a call to hbs.registerPartials. It expects to get called with the absolute path to the partials directory.

const hbs = require('hbs');

const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// Partials are created with the hbs file extension. Partials have access to all the same features as your handlebars templates. The header partial below renders the title followed by a list of navigation links which can be shown at the top of every page.

// {{!-- header.hbs --}} <h1>{{title}}</h1> 

// <div>     <a href="/">Weather</a>     <a href="/about">About</a>     <a href="/help">Help</a> </div>

// THe partial can then be rendered on a page using {{>header}} where "header" comes from the partial file name. If the partial was footer.hbs, it could be rendered using {{>footer}}

// Setting up a 404 page

// Express has support for * in route paths. This is a special character which matches anything. THis can be used to create a route handler that matches all requestes.

// The 404 pages should be set up just before the call to app.listen. This ensures that requests for valid pages setill get the correct response.

app.get("*", (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found.'
  })
})

// Accessing API from Browser

// Learn how to setups communication between the client and the server. THis will be done via HTTP requests. By the end of the section, users will be able to type an address in the browser to view their forecase.

// Query string

// You'll learn how to use query strings to pass data from the client to the server. THis will be used to send the address from the browser to Node.js. Node.js will then be able to fetch the weather for the address and send the forecase back to the browser.

// The query string is s portion of the URL that allows you to provide additional information to the server. For the weather application, the query string will be used to pass the address from the browser to the Node.js Express application.

// The query string comes after ? in the URL. THe example URL below uses the query string to set address equal to boson. They key/value pair is separated by = .

// THe Express route handler can access the query string key/value pairs on req.query. The handler below uses req.query.address to get the value provided for address. This address can then be used to fetch the weather information.

app.get('/weather', (req, res) => {
  res.send('"You provided " + req.query.address + " as the address."');
})

