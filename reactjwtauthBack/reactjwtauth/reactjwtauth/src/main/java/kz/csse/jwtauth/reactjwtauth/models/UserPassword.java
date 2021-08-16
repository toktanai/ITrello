package kz.csse.jwtauth.reactjwtauth.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPassword implements Serializable {

    private Long id;
    private String password;
    private String newPassword;
}
