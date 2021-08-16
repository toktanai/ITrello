package kz.csse.jwtauth.reactjwtauth.services;

import kz.csse.jwtauth.reactjwtauth.entities.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService  extends UserDetailsService {
    Users saveUser(Users user);
    Users getUser(String email);
}
