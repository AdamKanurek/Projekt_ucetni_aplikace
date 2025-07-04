
package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.service.PersonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService personService;

    /**
     * Adds a new person. Only accessible by users with the ADMIN role.
     *
     * @param personDTO the person data to add
     * @return the added person data
     */
    @Secured("ROLE_ADMIN")
    @PostMapping("/persons")
    public PersonDTO addPerson(@RequestBody @Valid PersonDTO personDTO) {
        return personService.addPerson(personDTO);
    }

    /**
     * Retrieves a list of all persons with pagination support.
     *
     * @param page  the page number (default is 0)
     * @param limit the maximum number of persons per page (default is 1000)
     * @return a list of persons
     */
    @GetMapping("/persons")
    public List<PersonDTO> getAllPersons(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1000") int limit
    ) {
        return personService.getAll(page, limit);
    }

    /**
     * Deletes a person by their ID. Only accessible by users with the ADMIN role.
     *
     * @param personId the ID of the person to delete
     */
    @Secured("ROLE_ADMIN")
    @DeleteMapping("/persons/{personId}")
    public void deletePerson(@PathVariable Long personId) {
        personService.removePerson(personId);
    }

    /**
     * Retrieves details of a person by their ID.
     *
     * @param personId the ID of the person to retrieve
     * @return the person data
     */
    @GetMapping("/persons/{personId}")
    public PersonDTO getPerson(@PathVariable Long personId) {
        return personService.getPerson(personId);
    }

    /**
     * Edits the data of a person identified by their ID. Only accessible by users with the ADMIN role.
     *
     * @param personId  the ID of the person to edit
     * @param personDTO the updated person data
     * @return the updated person data
     */
    @Secured("ROLE_ADMIN")
    @PutMapping("/persons/{personId}")
    public PersonDTO editPerson(@PathVariable Long personId, @RequestBody @Valid PersonDTO personDTO) {
        return personService.editPerson(personId, personDTO);
    }

    /**
     * Retrieves all sales invoices related to a person identified by their identification number.
     *
     * @param identification the identification number of the person
     * @return a list of sales invoices
     */
    @GetMapping("/identification/{identification}/sales")
    public List<InvoiceDTO> getAllSales(@PathVariable String identification) {
        return personService.getAllPersonsSales(identification);
    }

    /**
     * Retrieves all purchase invoices related to a person identified by their identification number.
     *
     * @param identification the identification number of the person
     * @return a list of purchase invoices
     */
    @GetMapping("/identification/{identification}/purchases")
    public List<InvoiceDTO> getAllPurchases(@PathVariable String identification) {
        return personService.getAllPersonsPurchases(identification);
    }
}

