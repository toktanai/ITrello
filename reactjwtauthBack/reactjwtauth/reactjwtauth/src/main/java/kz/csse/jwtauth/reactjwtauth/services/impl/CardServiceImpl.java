package kz.csse.jwtauth.reactjwtauth.services.impl;

import kz.csse.jwtauth.reactjwtauth.entities.CardTasks;
import kz.csse.jwtauth.reactjwtauth.entities.Cards;
import kz.csse.jwtauth.reactjwtauth.repositories.CardTasksRepository;
import kz.csse.jwtauth.reactjwtauth.repositories.CardsRepository;
import kz.csse.jwtauth.reactjwtauth.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    public CardsRepository cardsRepository;

    @Autowired
    public CardTasksRepository cardTasksRepository;

    @Override
    public List<Cards> AllCards() {
        return cardsRepository.findAll();
    }

    @Override
    public Cards saveCards(Cards cards) {
        return cardsRepository.save(cards);
    }

    @Override
    public Cards getCard(Long id) {
        return cardsRepository.findById(id).get();
    }

    @Override
    public void deleteCards(Cards cards) {
        cardsRepository.delete(cards);
    }

    @Override
    public List<CardTasks> AllCardTasks() {
        return cardTasksRepository.findAll();
    }

    @Override
    public CardTasks saveCards(CardTasks cardTask) {
        return cardTasksRepository.save(cardTask);
    }

    @Override
    public CardTasks getCardTask(Long id) {
        return cardTasksRepository.findById(id).get();
    }

    @Override
    public void deleteCardTask(CardTasks card) {
        cardTasksRepository.delete(card);
    }

    @Override
    public List<Cards> findAllByNameContainingOrderByAddedDateDesc(String name) {
        return cardsRepository.findAllByNameContainingOrderByAddedDateDesc(name);
    }
}
