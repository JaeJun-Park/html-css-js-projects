class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(key) {
        console.log('add vertex');
        if (!this.adjacencyList[key])
            this.adjacencyList[key] = [];
    }

    addEdge(vertex1, vertex2) {
        for (let vertex in this.adjacencyList) {
            if (vertex === vertex1) {
                this.adjacencyList[vertex].push(vertex2);
            } else if (vertex === vertex2) {
                this.adjacencyList[vertex].push(vertex1);
            }
        }
    }
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1);
    }

    removeVertex(vertex) {
        if (!this.adjacencyList.hasOwnProperty(vertex)) return null;
        for (let adjVertex of this.adjacencyList[vertex]) {
            this.removeEdge(adjVertex, vertex);
        }
        delete this.adjacencyList[vertex];
    }
}


const g = new Graph();
g.addVertex('tokyo');
g.addVertex('seoul');
g.addVertex('oita');
console.log('init', g);

g.addEdge('oita', 'tokyo');

g.addEdge('seoul', 'oita');
console.log(g)
// g.removeEdge('seoul', 'oita');
g.removeVertex('oita');
console.log(g);

