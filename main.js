const graphs = {
  first: {
    start: {
      a: 5,
      b: 2,
    },
    a: {
      c: 4,
      d: 2,
    },
    b: {
      a: 8,
      d: 7,
    },
    c: {
      d: 6,
      finish: 3,
    },
    d: {
      finish: 1,
    },
    finish: {},
  },
  second: {
    start: {
      a: 10,
    },
    a: {
      b: 20,
    },
    b: {
      finish: 30,
      c: 1,
    },
    c: {
      a: 1,
    },
    finish: {},
  },
  third: {
    start: {
      a: 2,
      b: 2,
    },
    a: {
      finish: 2,
      c: 2,
    },
    b: {
      a: 2,
    },
    c: {
      b: -1,
      finish: 2,
    },
    finish: {},
  },
  egor: {
    start: {
      a: 6,
      b: 2,
    },
    a: {
      finish: 1,
    },
    b: {
      a: 3,
      finish: 5,
    },
    finish: Infinity,
  },
};

const getNodeWithLowerCost = (costs, processed) => {
  let lower_cost = Infinity
  let lower_node = null

  for (const node of Object.keys(costs)) {
    const cost = costs[node]
    if (cost < lower_cost && !processed.includes(node)) {
      lower_cost = cost
      lower_node = node
    }
  }

  return lower_node
}

const startWorkingGraphs = (() => {
  for (const graphName of Object.keys(graphs)) {
    const graph = graphs[graphName]
    const costs = {}
    const parent = {}
    const processed = []

    for (const key in graph.start) {
      costs[key] = graph.start[key]
      parent[key] = "start"
    }

    let lower_node = getNodeWithLowerCost(costs, processed)

    while (lower_node) {
      const neighbors = Object.keys(graph[lower_node])

      for (const neighborNode of neighbors) {
        const fullCost = costs[lower_node] + graph[lower_node][neighborNode]
        if (fullCost < (costs[neighborNode] || Infinity)) {
          costs[neighborNode] = fullCost
          parent[neighborNode] = lower_node
        }
      }

      processed.push(lower_node)
      lower_node = getNodeWithLowerCost(costs, processed)
    }

    console.log(costs)
    console.log(parent)
  }
})()
