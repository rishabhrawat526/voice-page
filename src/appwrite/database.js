import {Client,Storage, Databases,Query,ID } from "appwrite";
import conf from "./../conf/conf"
class Database{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwrite_url)
        .setProject(conf.appwrite_project_id);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async add(data){
        try {
            await this.databases.createDocument(conf.appwrite_database_id,conf.appwrite_collection_id,ID.unique(),data);
        } catch (error){
            console.log(error.message);
        }
    };
    async update(id,data)
    {
        try {
            return await this.databases.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                id,
                data
            )
        } catch (error) {
            console.log(error)
        }
    }
    async remove(id)
    {
        try {
            await this.databases.deleteDocument(conf.appwrite_database_id,conf.appwrite_collection_id,id);
        } catch (error) {
            console.log(error.message)
        }
    };
    async getPosts(queries = [Query.equal('status','active')])
    {
        try {
            return await this.databases.listDocuments(conf.appwrite_database_id,conf.appwrite_collection_id,queries);
        } catch (error) {
            console.log(error)
            return false;
        }
    };
    async getPost(id)
    {
        try {
            return await this.databases.getDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                id
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    };
    async uploadFile(file)
    {
        try {
            return await this.bucket.createFile(
                conf.appwrite_bucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    };
    async deleteFile(fileid)
    {
        try {
            await this.bucket.deleteFile(
                conf.appwrite_bucket_id,
                fileid
            )
            return true
        } catch (error) {
            console.log(error.message)
            return false;
        }
    };

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwrite_bucket_id,
            fileId
        )
    }
};
const databaseService = new Database();
export default databaseService;