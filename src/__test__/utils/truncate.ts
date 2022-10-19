import { UserModel } from "../../models/userModel";


export default function truncateUser(){
    UserModel.destroy({truncate:true,force:true})

}