/**
 * Un gráfico simple y un algoritmo gráfico
 * @constructor
 */
 function Graph(v) {
    this.vertices = v // vértices
    this.edges = 0 // borde
    this.adj = [] // definir matriz
    this.marked = [] // Si la marca ha sido visitada falseNo visitado truePara visitado
 for  (var i = 0; i <this.vertices; i ++) {// Definir una matriz bidimensional
   this.adj[i] = []
   this.marked[i] = false
 }
    this.addEdge = addEdge // Agregar vértice
    this.show = show // mostrar vértices
    this.dfs = dfs // profundidad primera búsqueda
    this.bfs = bfs // amplitud primera búsqueda
    this.edgeTo = [] // Todas las aristas de un vértice al siguiente
    this.hasPathTo = hasPathTo // ¿Hay una ruta?
    this.pathTo = pathTo // La ruta más corta
}

// Agregar vértice
function addEdge(v, m) {
 this.adj[v].push(m)
 this.adj[m].push(v)
 this.edges++
}

// Mostrar vértices
function show() {
 for (var i = 0; i < this.vertices; i++) {
   var edges = ''
   for (var j = 0; j < this.vertices; j++) {
     if (this.adj[i][j]) {
       edges += this.adj[i][j] + ' '
     }
   }
   console.log(i + '->' + edges)
 }
}

// Profundidad primera búsqueda
function dfs(v) {
 this.marked[v] = true
 if (this.adj[v] !== undefined) {
   console.log(v + 'El nodo ha sido visitado')
 }
 for (var w in this.adj[v]) {
   var current = this.adj[v][w]
   if (!this.marked[current]) {
     this.dfs(current)
   }
 }
}

// Amplitud primera búsqueda
function bfs(v) {
 var queue = []
 this.marked[v] = true
 queue.push(v)
 while (queue.length > 0) {
   var s = queue.shift()
   if (s !== undefined) {
     console.log(s + 'El nodo ha sido visitado')
   }
   for (var w in this.adj[s]) {
     var current = this.adj[s][w]
     if (!this.marked[current]) {
       this.marked[current] = true
       this.edgeTo[current] = s
       queue.push(current)
     }
   }
 }
}

// hay un camino
function hasPathTo(v) {
 return this.marked[v]
}
// El camino más corto
function pathTo(v) {
 var source = 0
 if(!this.hasPathTo(v)) return undefined
 var path =[]
 for(var i=v; i!=source;i=this.edgeTo[i]) {
   path.push(i)
 }
 path.push(source)
 return path
}

var graph = new Graph(6)
graph.addEdge(0, 1)
graph.addEdge(0, 2)
graph.addEdge(2, 4)
graph.addEdge(1, 3)
graph.addEdge(3, 4)
graph.addEdge(3, 5)
graph.addEdge(4, 5)
graph.show()
console.log('======= Primera búsqueda en profundidad =========')
// graph.dfs(0)
console.log('======= Amplitud primera búsqueda =========')
graph.bfs(0)
var paths = graph.pathTo(5)
var str = ''
while(paths.length>0){
 if(paths.length>1) {
   str += paths.pop()+'->'
 }else {
   str +=paths.pop()
 }
}
console.log(str);