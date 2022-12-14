import { Arg, Mutation, Query, Resolver} from "type-graphql";
import * as bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return "hello world";
    }

    @Mutation(() => User)
    async register(
        @Arg("data") { 
            email, 
            firstName, 
            lastName, 
            password 
        }: RegisterInput
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        return user;
    }
}