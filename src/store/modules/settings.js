export default {
    state:{
        notifPermission:'default',
    },
    mutations:{
        WriteNotifPermission(state,permission){
            state.notifPermission = permission
        }
    }
}
