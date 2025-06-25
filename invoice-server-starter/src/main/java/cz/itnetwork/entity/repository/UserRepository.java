package cz.itnetwork.entity.repository;

import cz.itnetwork.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    /**
     * Finds a user by their email.
     *
     * @param username the user's email address
     * @return an Optional containing the user if found, or empty otherwise
     */
    Optional<UserEntity> findByEmail(String username);
}
