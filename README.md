# Building Web Applicatios with Node.JS and Express 4.0 (Pluralsight)
## Notes
### BASIC:
- Node has a package.json file in which you can tell it where to start and where you can find what dependencies it has.
- Node is **NOT** a web development framework on its own. Node can do lots of things (desktop apps, mobile, etc.).
- Express is a web development framework for Node. In this project, I'm using express.
- To use express the basics are:

  ```js

    var express = require('express');
    var app = express();

    //example route:
    app.get('/',function(req,res){
        res.send("Hello world :D");
    });
    /
    //Listen  to a port (REALLY IMPORTANT)
    app.listen(port,function(err){
        console.log('for some reason, we can\'t listen to that port T.T');
    });
  ```

### BOWER:
- Bower is a package manager for front end.
- It can be installed by using **_npm install bower_**
- Bower has to be initialized by using bower init.
- In order to configure bower's folder a file .bowerrc must be created.
- Directory config. looks like this:
- {
- "directory" : "public/libJS"
- }

### JSHINT AND JSCS
- JSHINT allows us to set coding standards. It is completely configurable which is quite useful.
- JSCS allows us to set style standards. E.g: Number of spaces between lines, tab spaces, etc...

### TEMPLATES:
- Handlebars: Great and really similar to lots of template engines for PHP. The problem with it though is that is uses {{}} and that's something AngularJS uses too, hence why I'm not using it.
- Jade: Too complex to use in general. Differs a lot from actual HTML.
- EJS : Doesn't mess with Angular. Uses <% %> as enclosing brackets, which I hate, but that will have to do in case I'm using AngularJS.

  ```js
     //Set views :
     app.set('views','./path/to/views');
     app.set('view engine','ejs'); //ejs,handlebars,jade.
     In order to render a view with some context, one can use the following:
     app.get('/',function(req,res){
     //It is important to notice that index has no extension
     //If a view engine is set, it will assume it on its own.
     res.render('index',context);
     });
  ```

### ROUTING:
- You can use a **Router** in order to route routes.

  ```js
  //It is assume that express is initialized in the app variable.
  //example routing:
  var bookRouter = express.Router();
  app.use('/Books',bookRouter);
  bookRouter.route('/')
    .get(function(req,res){
        res.send('Books routing response');
    });
  ```

- You can **export** modules. This is an important feature when using different files. To do so:

  ```js
  module.exports = [exported var/function/object];
  ```

- When exporting, it is possible to export a function. The function must return what app.js (or the caller) is expecting though. So, if we're trying to create a module which is a router, the exported function **must** return a router itself.

### Databases
- Node supports multiple dbs, but Mongo is by far the most popular.
- Mongo is document based, meaning that it works really nicely.
- From what I've seen, building a RESTful API using the Mongo+Express+Node, should be quire straightforward.

### Auth
- Passport is one of the most used Node packages to work with auth.
- We use **body-parser** module in order to get the body of a POST request as a JSON file. To use body parser, add the following onto app.js:

```js
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
```

The body can now be accessed as a JSON from a router in the following way:

```js
router.route('/example')
.post(function(req,res) {
    var body = req.body; //this is a JSON file.
});
```

- Important about passport: to redirect on **failure** password must receive a result as **false**. Sending an error does **not** redirect to the route defined as failureRedirect. So, on done function, it is necessary to either send **done(err,false)** or **done(err,undefined)**.
- Something that works for all defined routes is to tell the router to use a certain `function(req,res,next)`. This is really useful when dealing with Authentication. Basically, you can look for a user and, if not defined, redirect to homepage. Example:

```js
router.use(function(req,res,next) {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});
```

### Code Structure
- Controllers work the same way everything else does. It is pretty similar to using frameworks like CodeIgniter (PHP).
