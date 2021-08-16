package kz.csse.jwtauth.reactjwtauth.repositories;

import kz.csse.jwtauth.reactjwtauth.entities.CardTasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface CardTasksRepository extends JpaRepository<CardTasks,Long> {
}
