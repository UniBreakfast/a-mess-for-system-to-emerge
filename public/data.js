const relationMapData = []

export {relationMapData}

relationMapData.push(
  {
    relation: 'above', level: 2,
    nodes: {
      'node-1': [],
      'node-2': [],
      'node-3': [],
    },
  },
  {
    relation: 'above', level: 1,
    nodes: {
      'node-4': ['node-1', 'node-3'],
      'node-5': ['node-2'],
    },
  },
  'node-6',
  {
    relation: 'below', level: 1,
    nodes: {
      'node-7': ['node-17'],
      'node-8': ['node-18', 'node-20'],
      'node-9': ['node-14', 'node-17'],
      'node-10': ['node-11', 'node-12', 'node-20'],
      'node-11': ['node-13', 'node-15', 'node-16', 'node-19'],
    },
  },
  {
    relation: 'below', level: 2,
    nodes: {
      'node-13': ['node-14', 'node-15'],
      'node-14': [],
      'node-15': [],
      'node-16': [],
      'node-17': ['node-16'],
      'node-18': [],
      'node-19': ['node-21'],
      'node-20': [],
    },
  },
)
