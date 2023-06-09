const User = require('../models/user');
const { GraphQLError } = require('graphql');
const fetchFunction = require('../functions/fetchFunction');

const createUser = {
    Mutation: {
        async createUser(context, {input}){
            try{
                let {email} = input;
                const userValidation = await User.findOne({ email});
                if (!userValidation){
                    const user = new User(input);
                    let idnumber= JSON.stringify(user._id);
                    const identification = idnumber.replaceAll('"', '');
                    const formData={
                        input,
                        identification
                    }
                    user.save();

                    const authResponse= fetchFunction(formData, process.env.AUTHORIZATION_MICROSERVICE+'register' );
                    const userResponse= fetchFunction(formData, process.env.BACKEND_MICROSERVICE+'register');
                    return user;  
                }else{
                    throw new GraphQLError('User already exist'); 
                }
            }catch(e){
                throw new GraphQLError(e);
            }            
        } 
    }
};

module.exports = createUser;
        