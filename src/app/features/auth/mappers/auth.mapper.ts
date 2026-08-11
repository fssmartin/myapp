 import { AuthDto } from '../models/auth-dto.model';
import { BaseUser } from '../models/auth.model';


export class AuthMapper {

    // DTO to USER
  static toUser(response: AuthDto): BaseUser {

    return {
      id: response.id,
      name: response.username,
      email: response.email,
      firstN: response.firstName,
      lastN: response.lastName,
      gender: response.gender,
      image: response.image
    };


  }

}