const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const lodash = require("lodash")


const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const aboutStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const contactStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('home', {homeStartingContent, blogs: posts})
})

app.get('/about', function(req, res){
    res.render('about', {aboutStartingContent})
})

app.get('/contact', function(req, res){
    res.render('contact', {contactStartingContent})
})

app.get('/compose', function(req, res){
    res.render('compose')
})

let posts = []

app.post('/compose', function (req, res) {
    const blog = {
        title: req.body.blogTitle,  
        blogContent: req.body.blog 
    }
    posts.push(blog)
    res.redirect("/")
})

app.get('/blogs/:blogId', function (req, res) {
    var blogId = req.params.blogId
    blogId = lodash.lowerCase(blogId) 
    for(var i=0;i<posts.length;i++){
        if(blogId === lodash.lowerCase(posts[i].title)){
            res.render('blog', {blogTitle: posts[i].title, blogContent: posts[i].blogContent})
            break;
        }
    }
})

app.listen(3000, function(){
    console.log("Server started on port 3000")
})