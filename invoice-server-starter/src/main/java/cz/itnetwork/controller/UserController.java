package cz.itnetwork.controller;

import cz.itnetwork.dto.UserDTO;
import cz.itnetwork.entity.UserEntity;
import cz.itnetwork.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Creates a new user.
     *
     * @param userDTO the user data transfer object containing user details
     * @return the created user as a UserDTO
     */
    @PostMapping("/user")
    public UserDTO addUser(@RequestBody @Valid UserDTO userDTO) {
        return userService.create(userDTO);
    }

    /**
     * Authenticates a user and logs them in.
     *
     * @param userDTO the user data transfer object containing login credentials
     * @param req the HTTP servlet request for login
     * @return the logged-in user details as a UserDTO
     * @throws ServletException if login fails
     */
    @PostMapping("/auth")
    public UserDTO login(@RequestBody @Valid UserDTO userDTO, HttpServletRequest req) throws ServletException {
        req.login(userDTO.getEmail(), userDTO.getPassword());

        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDTO model = new UserDTO();
        model.setEmail(user.getEmail());
        model.setUserId(user.getUserId());
        model.setAdmin(user.isAdmin());
        return model;
    }

    /**
     * Logs out the currently authenticated user.
     *
     * @param req the HTTP servlet request for logout
     * @return confirmation message indicating the user has been logged out
     * @throws ServletException if logout fails
     */
    @DeleteMapping("/auth")
    public String logout(HttpServletRequest req) throws ServletException {
        req.logout();
        return "Uživatel odhlášen";
    }

    /**
     * Retrieves the currently authenticated user's details.
     *
     * @return the current user as a UserDTO
     * @throws ServletException if no user is authenticated or casting fails
     */
    @GetMapping("/auth")
    public UserDTO getCurrentUser() throws ServletException {
        try {
            UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            UserDTO model = new UserDTO();
            model.setEmail(user.getEmail());
            model.setUserId(user.getUserId());
            model.setAdmin(user.isAdmin());
            return model;
        } catch (ClassCastException e) {
            throw new ServletException();
        }
    }
}
