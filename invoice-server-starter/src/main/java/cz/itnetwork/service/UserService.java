package cz.itnetwork.service;

import cz.itnetwork.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    /**
     * Creates a new user with encoded password and stores it in the database.
     *
     * @param model user data to create
     * @return newly created user
     */
    UserDTO create(UserDTO model);
}
