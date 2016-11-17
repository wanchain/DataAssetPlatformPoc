/**
 * Created by zy on 16-11-14.
 */
import User from '../models/userModel.js';

export default {

/*
    signin(user, setSessionUserCB) {
        var ret = { "user" : undefined, "error" : undefined };

        if (!user.name) {
            ret.error = 'Must provide email and password' ;
            return ret;
        }

        console.log("mongodb will find user:" + user.name);
        var qPromise = User.findOne( { name : user.name } ).exec();
        return qPromise.then(quser => {
            console.log("xxxxxx");
            quser.comparePassword("wanglu", (err, isMatch)=>{
                console.log("signin is match:" + isMatch );
                if(isMatch){
                    ret.user = {name: quser.name, password: quser.password};
                    setSessionUserCB(user);
                } else {
                    ret.error = "invalid password";
                }
            });
            console.log("sign in promise then:" + JSON.stringify(ret));
            return ret;
        }).then();
    },

    signin(user) {
        var ret = { "user" : undefined, "error" : undefined };

        if (!user.name) {
            ret.error = 'Must provide email and password' ;
            return ret;
        }

        console.log("mongodb will find user:" + user.name);
        var qPromise = User.findOne( { name : user.name } ).exec();
        qPromise.then(quser => {
            console.log("quser" + quser);
            if(!quser) {
                ret.error = 'User not exist';
            }
            new Promise( (resolve, reject) => {
                quser.comparePassword(user.password, (err, isMatch)=>{
                    if (!err) resolve(isMatch);
                    else reject(err);
                })
            })
                .then((isMatch) => {
                    console.log("is match:" + isMatch);
                    if(isMatch){
                        ret.user = {name: quser.name, password: quser.password}
                    } else {
                        ret.error = "invalid password";
                    }
                })
        })
        console.log("ret is" + ret.user + "error" + ret.error);
        return ret;
    },*/

    signin(user, setSessionUserCB) {
        var ret = { "user" : undefined, "error" : undefined };

        if (!user.name) {
            ret.error = 'Must provide email and password' ;
            return ret;
        }

        console.log("mongodb will find user:" + user.name);
        var qPromise = User.findOne( { name : user.name } ).exec();
        return qPromise.then(quser => {
            console.log("xxxxxx");
            return new Promise( (resolve, reject) => {
                quser.comparePassword(user.password, (err, isMatch)=>{
                    if (!err) resolve(isMatch);
                    else reject(err);
                })
            })
                .then((isMatch) => {
                    console.log("is match:" + isMatch);
                    if(isMatch){
                        ret.user = {name: quser.name, password: quser.password}
                    } else {
                        ret.error = "invalid password";
                    }
                    return ret;
                })
        });
    },

    signup(user) {
        console.log("running sign up");
        var ret = { "user" : undefined, "error" : undefined };

        if (!user.name) {
            ret.error = 'Must provide email and password' ;
            return ret;
        }

        User.findOne( { name : user.name } )
            .then(quser => {
                if(quser) {
                    ret.error = 'User already exist';
                }
                var newUser = new User({
                    email : user.name,
                    password : user.password,
                    name : user.name
                });
                newUser.save()
                    .then(nuser => {
                        //存到session
                    })
            })
            .catch(err => {
                ret.error = err;
            });
    }
};
