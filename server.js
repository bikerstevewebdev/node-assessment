const express = require('express')
const uc = require('./usersCtrl')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.url)
    next()
})


app.get('/api/users', uc.getUsers)
app.get('/api/users/:userId', uc.getUserByID)
app.get('/api/admins', uc.getAdmins)
app.get('/api/nonadmins', uc.getNonAdmins)
app.get('/api/user_type/:userType', uc.getUsersByType)
app.put('/api/users/:userId', uc.updateUser)
app.post('/api/users', uc.addUser)
app.delete('/api/users/:userId', uc.deleteUser)

app.listen(3000, () => {
    console.log('Node assessment yo on puerto tres millianos arrrrrriba!!!!!')
})