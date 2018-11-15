
export const selectShool = (state, action) => {
  switch (action.type) {
    case "SELECT_SCHOOL_CITY":  // 选择省份
      return Object.assign({}, { ...state, selectShoolCity: { ...action.data } })
    case "SELECT_SCHOOL_CITY_SCHOOL": // 选择省份对应的学校
      return Object.assign({}, { ...state, selectShoolCitySchool: { ...action.data } })
    default:
      return { ...state }
  }
}
