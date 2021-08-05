export default function reducer(state, action) {
  switch (action.type) {
    case "navigate": {
      return { ...state, jarname: action.payload.jarname , iotToken : action.payload.iotToken};
    }
    default:
      return state;
  }
}
