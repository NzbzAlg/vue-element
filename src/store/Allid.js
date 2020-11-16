const state = {
    all: { 
        commodityId:'',//商品管理详情id
    }
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    setPrint(state, all) { //设置参数
        state.all = all;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}