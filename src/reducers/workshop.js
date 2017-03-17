const initialState = {
  image: undefined,
  options: [
    {
      title: "Accuracy",
      name: "accuracy",
      value: 0.7,
      icon: "speedometer",
      min: 0,
      max: 1
    },
    {
      title: "Blur",
      name: "blur",
      value: 40,
      icon: "speedometer",
      min: 1,
      max: 100
    },
    {
      title: "Threshold",
      name: "threshold",
      value: 50,
      icon: "speedometer",
      min: 1,
      max: 100
    },
    {
      title: "Vertex Count",
      name: "vertexCount",
      value: 700,
      icon: "speedometer",
      min: 100,
      max: 1000
    },
    {
      title: "Stroke Width",
      name: "strokeWidth",
      value: 0.5,
      icon: "speedometer",
      min: 0,
      max: 1
    },
    {
      title: "Gradient Stops",
      name: "gradientStops",
      value: 4,
      icon: "speedometer",
      min: 2,
      max: 10
    }
  ]
};

export const WorkshopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_IMAGE": {
      return Object.assign({}, state, { image: undefined });
    }
    case "SET_IMAGE":
    case "COPY_IMAGE": {
      return Object.assign({}, state, action.payload);
    }
    case "SET_OPTION": {
      return state;
    }
    default: {
      return state;
    }
  }
};
