const md5 = require('md5');
const Users = require('../models/base.model');

const generateHash = (param = Date.now()) => {
    return md5(param)
}

class BaseController {

    async getIndex(req, res) {

        const logout = () => {
            res.clearCookie('login');

            res.redirect('/login');
        }


        if (req.query.p == 'logout')
            return logout()


        if (req.cookies.login) {
            const check = await Users.findOne({ token_login: req.cookies.login });

            if (check)
                return res.render('../views/index.ejs', check);

        }

        return logout()


    }

    getLogin(req, res) {
        res.render('../views/login.ejs', { status: '' });
    }

    async Login(req, res) {

        const check = await Users.findOne({ ...req.body, pass: generateHash(req.body.pass) })

        let status = 'err';

        if (check) {
            if (check.status) {

                let token_login = 'login-' + generateHash();

                await Users.updateOne({ email: req.body.email }, { token_login })

                res.cookie('login', token_login);

                return res.redirect('/');

                status = 'ok'

            }
            else {
                status = 'not-active'
            }

        }

        res.render('../views/login.ejs', { status });
    }

    getRegister(req, res) {
        res.render('../views/register.ejs', { status: '' });
    }

    async Register(req, res) {

        console.log(req.body)

        const check = await Users.findOne({ email: req.body.email });
        let status = 'already';
        if (!check) {
            await Users.create({ ...req.body, pass: generateHash(req.body.pass), token_activate: 'token-' + generateHash() })

            status = 'ok';
        }


        res.render('../views/register.ejs', { status });
    }

    async activate(req, res) {

        const check = await Users.findOne({ token_activate: req.params.token });

        console.log(check);

        if (check) {
            await Users.updateOne({ email: check.email }, { status: true, token_activate: '' });
            return res.render('../views/activate.ejs');
        }

        res.render('../views/activate_err.ejs');

    }

    getForgot(req, res) {
        res.render('../views/forgot.ejs');
    }

    async Forgot(req, res) {

        let status = 'err';
        const check = await Users.findOne(req.body);

        console.log(check)

        if (check) {
            status = 'ok';

            let token_restore = 'restore-' + Date.now();
            await Users.updateOne({ email: check.email }, { token_restore });
        }


        res.render('../views/forgot.ejs', { status });
    }

    async getRestore(req, res) {

        let token_restore = req.params.token;

        const check = await Users.findOne({ token_restore });

        console.log(check);

        if (check) {
            return res.render('../views/restore.ejs', { status: '' });
        }

        res.render('../views/restore_err.ejs');

    }

    async Restore(req, res) {

        await Users.updateOne({ token_restore: req.params.token }, { pass: md5(req.body.pass), token_restore: '' });

        return res.render('../views/restore.ejs', { status: 'ok' });
    }

}


module.exports = new BaseController();