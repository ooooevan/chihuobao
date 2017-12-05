const domain = `http://localhost:3333`
const baseUrl = `${domain}/api`
export default {
  user: {
    elemeSuggestions: `${baseUrl}/elemeSuggestions`,
    login: `${baseUrl}/login`,
    sendCode: `${baseUrl}/code`,
    register: `${baseUrl}/register`,
    logOut: `${baseUrl}/logOut`,
    getShopList: `${baseUrl}/shop/findByRange`,
    getInfoByShopId: `${baseUrl}/shop/findById`,
    getCommentByDishId: `${baseUrl}/shop/dish`
  },
  seller: {
  },
  admin: {}
}
