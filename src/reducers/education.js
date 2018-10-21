
export const selectShool = (state, action) => {
  switch (action.type) {
    case "SELECT_SCHOOL_CITY":
      return Object.assign({}, { ...state, selectShoolCity: { ...action.data } })
    case "SELECT_SCHOOL_CITY_SCHOOL":
      return Object.assign({}, { ...state, selectShoolCitySchool: { ...action.data } })
    default:
      return { ...state }
  }
}