
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

    @Secured("ROLE_ADMIN")
    @PostMapping("/persons")
    public PersonDTO addPerson(@RequestBody @Valid PersonDTO personDTO) {
        return personService.addPerson(personDTO);
    }

    @GetMapping("/persons")
    public List<PersonDTO> getAllPersons(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1000") int limit
    ) {
        return personService.getAll(page, limit);
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/persons/{personId}")
    public void deletePerson(@PathVariable Long personId) {
        personService.removePerson(personId);
    }

    @GetMapping("/persons/{personId}")
    public PersonDTO getPerson(@PathVariable Long personId) {
        return personService.getPerson(personId);
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/persons/{personId}")
    public PersonDTO editPerson(@PathVariable Long personId, @RequestBody @Valid PersonDTO personDTO) {
        return personService.editPerson(personId, personDTO);
    }

    @GetMapping("/identification/{identification}/sales")
    public List<InvoiceDTO> getAllSales(@PathVariable String identification) {
        return personService.getAllPersonsSales(identification);
    }

    @GetMapping("/identification/{identification}/purchases")
    public List<InvoiceDTO> getAllPurchases(@PathVariable String identification) {
        return personService.getAllPersonsPurchases(identification);
    }
}

