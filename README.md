#Zefti Request


##Persistent Request
1. Require request:
```var Request = require('request');```

2. Instantiate request & pass in optional variables:
```var request = new Request({protocol:'http', hostname : 'google.com', path: '/mypath'});```

3. Execute a method:
```request.get({headers: {token:'xyz'}}, function(err, response){
     //Do something with the err/response
   });```

##Available Options:
- protocol : Either 'http' or 'https' (defaults to http)
- hostname : the base domain name (required)
- path : the path after the base domain (defaults to empty)
- port : the port (defaults to 80)
- headers : common headers to be sent with every request (defaults to none)
- body : default body to be send with every request (defaults to none)
- headers['Content-Type'] : The content type of the request (defaults to application/json)

##Available methods:
- request.get
- request.post
- request.put
- request.del


5. Available options:
body : body to be sent with the request (defaults to none, if a body was set in the constructor, body will be additive, but this will overwrite)
headers : headers to be sent with the request (defaults to none, if headers were set in the constructor, headers will be additive, but this will overwrite)
queryString : query string parameters to be sent with the request

