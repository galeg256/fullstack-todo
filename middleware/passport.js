import strategy from 'passport-jwt'
const JwtStrategy = strategy.Strategy
import extract from 'passport-jwt'
const ExtactJwt = extract.ExtractJwt
//import passport from 'passport'
import {config} from '../config/keys.js'
import {db} from '../app.js'

const options = {
    jwtFromRequest: ExtactJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt
}

export default passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            try {
                const sqlSelect = 'SELECT * FROM todo.user WHERE userId=?'
                db.query(sqlSelect, payload.userId, (err, result) => {
                if (result[0].userId) {
                    done(null, result[0].userId)
                } else {
                    done(null, false)
                }
                })
            }
            catch(e) {
                console.log(e)
            }
        })
    )
}