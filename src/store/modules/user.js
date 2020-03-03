export default {
    state: {
        perms: [],  // 用户权限标识集合
        users:{}
    },
    getters: {

    },
    mutations: {
        setPerms(state, perms){  // 用户权限标识集合
            state.perms = perms;
        } ,
      setUserInfo(state, users){  // 用户权限标识集合
            state.users = users;
        }
    },
    actions: {
    }
}
