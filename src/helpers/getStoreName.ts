import Api from "../api/api";

export const getStoreName = async (user_uuid: any) => {

    try {
        const store = await Api.getStoreByUserUuid(user_uuid)
        return store.name

    } catch (e) {
        console.log(e)
        throw e
    }
}