package kz.csse.jwtauth.reactjwtauth.models;

import kz.csse.jwtauth.reactjwtauth.entities.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO implements Serializable {

    private Long id;
    private String email;
    private String fullName;
    private List<Roles> roles;

}
