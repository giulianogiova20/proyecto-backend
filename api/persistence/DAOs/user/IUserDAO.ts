class IUserDAO {
    constructor(){}

    async save(user: any){
        throw new Error('User save not Implemented')
    }

    async getUser(user: any){
        throw new Error('User getUser not Implemented')
    }
}

export default IUserDAO