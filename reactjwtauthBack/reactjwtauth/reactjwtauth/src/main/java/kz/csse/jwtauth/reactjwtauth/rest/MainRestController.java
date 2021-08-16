package kz.csse.jwtauth.reactjwtauth.rest;

import kz.csse.jwtauth.reactjwtauth.entities.CardTasks;
import kz.csse.jwtauth.reactjwtauth.entities.Cards;
import kz.csse.jwtauth.reactjwtauth.entities.Users;
import kz.csse.jwtauth.reactjwtauth.models.UserDTO;
import kz.csse.jwtauth.reactjwtauth.models.UserPassword;
import kz.csse.jwtauth.reactjwtauth.services.CardService;
import kz.csse.jwtauth.reactjwtauth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class MainRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private CardService cardService;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;


    @PutMapping(value = "/saveUser")
    public ResponseEntity<?>  saveUser(@RequestBody Users user){
        Users users = getUser();
        users.setFullName(user.getFullName());
        userService.saveUser(users);
        return ResponseEntity.ok("Data updated!");
    }
    @PutMapping(value ="/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody UserPassword u){
        Users user = getUser();

        if(bCryptPasswordEncoder.matches(u.getPassword(),user.getPassword())){
            user.setPassword(bCryptPasswordEncoder.encode(u.getNewPassword()));
            userService.saveUser(user);
            String message = "Password saved !";
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return ResponseEntity.ok("Wrong old password,please again enter old password!");
    }
    @GetMapping(value = "/getUser/{email}")
    public ResponseEntity<?> getuser(@PathVariable(name = "email") String email){
        Users user = userService.getUser(email);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
    @GetMapping(value = "/profile")
    public ResponseEntity<?> profilePage(){
        Users user = getUser();
        return new ResponseEntity<>(new UserDTO(user.getId(), user.getEmail(),user.getFullName(), user.getRoles()), HttpStatus.OK);
    }
    private Users getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            Users user = (Users) authentication.getPrincipal();
            return user;
        }
        return null;
    }
    @GetMapping(value = "/allCards")
    public ResponseEntity<?> getAllCards(){
        List<Cards> cards = cardService.AllCards();
        List<Cards> cards_new = cardService.AllCards();
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }
    @GetMapping(value = "/allCardTask")
    public ResponseEntity<?> getallCardTask(){
        List<CardTasks> cards = cardService.AllCardTasks();
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }
    @GetMapping(value = "/search/{name}")
    public ResponseEntity<?> getCardBySearch(@PathVariable(name = "name") String name){
        if(!name.equals("null")) {
            List<Cards> cardsBySearch = cardService.findAllByNameContainingOrderByAddedDateDesc(name);
            return new ResponseEntity<>(cardsBySearch,HttpStatus.OK);
        }else{
            List<Cards> cardsBySearch = cardService.AllCards();
            return new ResponseEntity<>(cardsBySearch,HttpStatus.OK);

        }

    }

    @PostMapping(value = "/addCard")
    public ResponseEntity<?> addCard(@RequestBody Cards card){
        cardService.saveCards(card);
        return ResponseEntity.ok(card);
    }
    @PostMapping(value = "/addCardTask")
    public ResponseEntity<?> addCardTask(@RequestBody CardTasks task){
        cardService.saveCards(task);
        return ResponseEntity.ok(task);
    }
    @GetMapping(value = "/getCard/{id}")
    public ResponseEntity<?> getCard(@PathVariable(name = "id") Long id){
        Cards card = cardService.getCard(id);
        System.out.println(card.getAddedDate().toString());
        if(card!=null){
            return ResponseEntity.ok(card);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping(value = "/saveCard")
    public ResponseEntity<?> saveItem(@RequestBody Cards card){
        cardService.saveCards(card);
        return ResponseEntity.ok(card);
    }
    @GetMapping(value = "/getTask/{id}")
    public ResponseEntity<?> getTask(@PathVariable(name = "id") Long id){
        CardTasks task = cardService.getCardTask(id);

        if(task!=null){
            return ResponseEntity.ok(task);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping(value = "/saveTask")
    public ResponseEntity<?> saveTask(@RequestBody CardTasks task){
        cardService.saveCards(task);
        return ResponseEntity.ok(task);
    }
    @DeleteMapping(value = "/deleteCard")
    public ResponseEntity<?> deleteItem(@RequestBody Cards card){
        Cards checkCard = cardService.getCard(card.getId());
        if(checkCard!=null){
            cardService.deleteCards(checkCard);
            return ResponseEntity.ok(checkCard);
        }
        return ResponseEntity.ok(card);
    }
    @DeleteMapping(value = "/deleteCardTask")
    public ResponseEntity<?> deleteItem(@RequestBody CardTasks tasks){
        CardTasks checkTask = cardService.getCardTask(tasks.getId());
        if(checkTask!=null){
            cardService.deleteCardTask(checkTask);
            return ResponseEntity.ok(checkTask);
        }
        return ResponseEntity.ok(tasks);
    }

}
