package kz.csse.jwtauth.reactjwtauth.services;

import kz.csse.jwtauth.reactjwtauth.entities.CardTasks;
import kz.csse.jwtauth.reactjwtauth.entities.Cards;

import java.util.List;

public interface CardService {
    List<Cards> AllCards();
    Cards saveCards(Cards cards);
    Cards getCard(Long id);
    void deleteCards(Cards cards);
    List<CardTasks> AllCardTasks();
    CardTasks saveCards(CardTasks cardTask);
    CardTasks getCardTask(Long id);
    void deleteCardTask(CardTasks card);
    List<Cards> findAllByNameContainingOrderByAddedDateDesc(String name);
}
