package kz.csse.jwtauth.reactjwtauth.repositories;

import kz.csse.jwtauth.reactjwtauth.entities.Cards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface CardsRepository extends JpaRepository<Cards,Long> {
    List<Cards> findAllByNameContainingOrderByAddedDateDesc(String name);
}
