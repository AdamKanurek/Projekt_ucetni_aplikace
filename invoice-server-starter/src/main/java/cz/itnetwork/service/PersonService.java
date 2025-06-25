package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;

import java.util.List;

public interface PersonService {

    /**
     * Creates a new person
     *
     * @param personDTO Person to create
     * @return newly created person
     */
    PersonDTO addPerson(PersonDTO personDTO);

    /**
     * <p>Sets hidden flag to true for the person with the matching [id]</p>
     * <p>In case a person with the passed [id] isn't found, the method <b>silently fails</b></p>
     *
     * @param id Person to delete
     */
    void removePerson(Long id);

    /**
     * Retrieves all persons who are not hidden, paginated.
     *
     * @param page  the page number (zero-based)
     * @param limit the maximum number of persons per page
     * @return a list of all non-hidden persons
     */
    List<PersonDTO> getAll(int page, int limit);

    /**
     * Attempts to fetch a person by an [id]
     *
     * @param personId Person to fetch
     * @return Fetched entity
     */
    PersonDTO getPerson(Long personId);

    /**
     * Hides the old person and creates new one with edited data
     *
     * @param personId  Person to fetch
     * @param personDTO Person data to edit
     * @return Edited person
     */
    PersonDTO editPerson(Long personId, PersonDTO personDTO);

    /**
     * Fetches all purchases made by a person
     *
     * @param identification Person to fetch his purchases
     * @return List of all purchases made by this person
     */
    List<InvoiceDTO> getAllPersonsPurchases(String identification);

    /**
     * Fetches all sales made by a person
     *
     * @param identification Person to fetch his sales
     * @return List of all sales made by this person
     */
    List<InvoiceDTO> getAllPersonsSales(String identification);
}
