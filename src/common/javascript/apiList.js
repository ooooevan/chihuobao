const domain = `http://localhost:3333`
const baseUrl = `${domain}/api`
export default {
  user: {
    elemeSuggestions: `${baseUrl}/elemeSuggestions`,
    login: `${baseUrl}/login`,
    sendCode: `${baseUrl}/code`,
    register: `${baseUrl}/regist`,
    reset: `${baseUrl}/reset`,
    logOut: `${baseUrl}/info/logout`,
    initInfo: `${baseUrl}/info/check`,
    modifyInfo: `${baseUrl}/info/modify`,
    getShopList: `${baseUrl}/shop/findByRange`,
    getInfoByShopId: `${baseUrl}/shop/findById`,
    getCommentByDishId: `${baseUrl}/shop/dish`,
    applyShop: `${baseUrl}/info/apply`,
    deleteOrder: `${baseUrl}/order/delete`,
    cancelOrder: `${baseUrl}/order/cancel`,
    getShopPhone: `${baseUrl}/order/getPhone`,
    getUserOrder: `${baseUrl}/order/find`,
    finishOrder: `${baseUrl}/order/finish`,  // dd
    upload: `${baseUrl}/upload`
  },
  seller: {
    initInfo: `${baseUrl}/shop/shopMsg`,
    getSellerOrder: `${baseUrl}/shopOrder`,
    handleOrder: `${baseUrl}/shopOrder/handle`,
    getAllDish: `${baseUrl}/shop/getAllDish`,
    modifyDish: `${baseUrl}/shop/modifDish`,
    deleteDish: `${baseUrl}/shop/delDish`,
    addDish: `${baseUrl}/shop/addDish`,
    modifyShopInfo: `${baseUrl}/shop/updateShop`,
    getRateList: `${baseUrl}/comment/dish`,
    isNewOrder: `${baseUrl}/shopOrder/getNewOrder`,
    upload: `${baseUrl}/upload`
  },
  admin: {}
}
