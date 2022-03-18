const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('json-server/db.json')
const middlewares = jsonServer.defaults()
let userCurrentapi = 0;

server.use(middlewares)
server.use(jsonServer.rewriter({
  '/session/*': '/$1',
  '/event/*': '/$1',
  '/menu/*': '/$1',
  '/collection/root': '/root',
  '/collection/*\\?tree=:tree': '/$1',
  "/collection/root/items\\?models=:models": "/rootitems",
  '/user/*': '/$1'
}))
server.use((req, res, next) => {
  if(res.req.url=='/current' &&userCurrentapi==0) {
    userCurrentapi++;
    res.status(500).jsonp({
      error: "error message here"
    })
  }
  if (req.method === "POST") {
    // If the method is a POST echo back the name from request body
    res.json({"id":"190d3afd-e2ab-448d-9320-1f6a6292aa7e"});
  } else {
    //Not a post request. Let db.json handle it
    next();
 }
})
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})