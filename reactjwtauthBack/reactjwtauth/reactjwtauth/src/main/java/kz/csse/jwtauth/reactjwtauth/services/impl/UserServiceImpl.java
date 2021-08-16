package kz.csse.jwtauth.reactjwtauth.services.impl;

import kz.csse.jwtauth.reactjwtauth.entities.Users;
import kz.csse.jwtauth.reactjwtauth.repositories.UserRepository;
import kz.csse.jwtauth.reactjwtauth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(s);
        if(user!=null){
            return user;
        }else{
            throw new UsernameNotFoundException("USER NOT FOUND");
        }
    }


    @Override
    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    @Override
    public Users getUser(String email) {
        Users user = userRepository.findByEmail(email);
        return user;
    }
}
