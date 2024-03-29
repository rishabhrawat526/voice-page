
import conf from "./../conf/conf"
import { Client, Account ,ID} from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor()
    {
        this.client.setEndpoint(conf.appwrite_url).setProject(conf.appwrite_project_id);
        this.account = new Account(this.client);

    }
    async signup({email,password,username})
    {
       try {
           const user =  await this.account.create(ID.unique(),email,password,username);
           if(user)
           {
            return this.login({email,password})
           }
       } catch (error) {
        console.log(error.message)
       }

    }

    async login({email,password})
    {
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            console.log(error)
        }

    }
    async logout()
    {
        try {
           await this.account.deleteSessions();
            // navigate to login page if successfull
        } catch (error) {
            console.log(error.message)
        }
    }
    async getCurrentUser()
    {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error.message)
        }
        return null;
    }
};
const authService = new AuthService();
export default authService;