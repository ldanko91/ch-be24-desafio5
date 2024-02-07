import { Router } from "express";
import UsersDBManager from "../dao/dbManagers/UsersDBManager.js";
import session from "express-session";

const loginRouter = Router();
const DBUsersManager = new UsersDBManager();

loginRouter.get('/login', (req, res) => {
    if (!req.session || !req.session.user) {
        return res.render('login', {
            title: `Acceso de usuarios`
        })
    } res.redirect('/api/sessions/profile')
})

loginRouter.post('/login', async (req, res) => {
    let { email, password } = req.body
    try {
        let DBuser = await DBUsersManager.getUserByEmail(email);
        if (!DBuser) {
            return res.json({ message: 'Bad request' })
        } if (password != DBuser.password) {
            console.log(password)
            console.log(DBuser.password)
            return res.json({ message: 'Bad request' })
        }
        console.log(DBuser)
        console.log('login correcto')
        req.session.user = {
            first_name: DBuser.first_name,
            last_name: DBuser.last_name,
            email: DBuser.email,
            role: DBuser.role
        }
        // res.redirect('/api/session/profile')
    } catch (error) {
        console.log(error)
    }

})

loginRouter.get('/profile', async (req, res) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/api/sessions/login');
    }
    try {
        let email = req.session.user.email;
        let user = await DBUsersManager.getUserByEmail(email);
        console.log(user);

        if (user.role === 'admin') {
            let users = await DBUsersManager.getUsers();
            res.render('adminSection', {
                users,
                title: `Listado de usuarios`
            });
        }

        res.render('userProfile', {
            user,
            title: `Perfil de ${user.first_name} ${user.last_name}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

loginRouter.get('/register', (req, res) => {
    res.render('register', {
        title: `Formulario de registro`
    })
})

loginRouter.post('/register', async (req, res) => {
    let { first_name, last_name, email, age, password } = req.body
    try {
        let newUser = {first_name, last_name, email, age, password}
        console.log(newUser)
        let userCreation = await DBUsersManager.addUser(newUser)
        res.redirect('/api/session/userProfile')
    } catch (error) {
        console.log(error)
        res.json({message: error})
    }

})

export default loginRouter;