var userData = require('./userData.json')

module.exports = {
    getUsers: (req, res) => {
        console.log('getUsers hit')
        console.log(req.query)
        const { age, lastname, email, favorites } = req.query
        if(age || lastname || email || favorites){
            if(age){
                console.log('sending age')
                let users = userData.filter(v => v.age < age)
                res.status(200).send(users)
            }else if(lastname){
                console.log('sending lastname')
                let users = userData.filter(v => v.last_name === lastname)
                res.status(200).send(users)
            }else if(email) {
                console.log('sending email')
                let users = userData.filter(v => v.email === email)
                res.status(200).send(users)
            }else if(favorites){
                console.log('sending favorites')
                let users = userData.filter(v => v.favorites.includes(favorites))
                res.status(200).send(users)
            }
        }else{
            res.status(200).send(userData)
        }
    },
    getUserByID: (req, res) => {
        console.log(req.params)
        if(req.params.userId){
            let user = userData.find(v => v.id === req.params.userId/1)
            if(user){
                res.status(200).send(user)
            }else{
                res.status(404).json(null)
            }
        }else{
            res.status(404).send(null)

        }
    },
    getAdmins: (req, res) => {
        let admins = userData.filter(v => v.type === "admin")
        res.status(200).send(admins)
    },
    getNonAdmins: (req, res) => {
        let nonAdmins = userData.filter(v => v.type !== "admin")
        res.status(200).send(nonAdmins)
    },
    getUsersByType: (req, res) => {
        const { userType } = req.params
        let users = userData.filter(v => v.type === userType)
        if(users.length){
            res.status(200).send(users)
        }else{
            res.status(404).json(null)
        }
    },
    updateUser: (req, res) =>{
        const { userId } = req.params
        let users = userData.slice()
        let index = users.indexOf(users.find(v => v.id === userId/1))
        let user = users.find(v => v.id === userId/1)
        users[index] = {...user, ...req.body}
        res.status(200).send(users)
    },
    addUser: (req, res) =>{
        let users = userData.slice()
        let index = userData.length
        let user = {...req.body, "id": index+1}
        users.push(user)
        res.status(200).send(users)
    },
    deleteUser: (req, res) => {
        const { userId } = req.params
        let users = userData.slice()
        let index = users.indexOf(users.find(v => v.id === userId/1))
        users.splice(index, 1)
        res.status(200).send(users)
    }

}