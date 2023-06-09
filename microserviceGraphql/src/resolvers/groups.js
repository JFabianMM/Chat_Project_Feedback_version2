const { GraphQLError } = require('graphql');
const fetchFunction = require('../functions/fetchFunction');

const groups = {
    Query: { 
        async groups(context,args){
            try{
                let req=context.headers.authorization;
                const token = req.replace('Bearer ','');
                const authFormData={token};
                const authResponse= await fetchFunction(authFormData, process.env.AUTHORIZATION_MICROSERVICE+'validation' ); 
                if (!authResponse.identification){
                    throw new GraphQLError('Please Authenticate');
                }            
                const formData={identification: args.id}
                const group= await fetchFunction(formData, process.env.BACKEND_MICROSERVICE+'groups');
                return group.groups;
            }catch(e){
                throw new GraphQLError(e);
            }
        }
    },
};

module.exports = groups;
        