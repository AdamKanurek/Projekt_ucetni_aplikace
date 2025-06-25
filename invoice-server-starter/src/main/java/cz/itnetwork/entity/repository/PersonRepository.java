
package cz.itnetwork.entity.repository;

import cz.itnetwork.entity.PersonEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<PersonEntity, Long> {

    /**
     * Retrieves a paginated list of persons filtered by their hidden status.
     *
     * @param hidden   whether the person is hidden or not
     * @param pageable pagination information
     * @return list of persons matching the hidden status
     */
    List<PersonEntity> findByHidden(boolean hidden, Pageable pageable);

    /**
     * Finds all persons with the given identification number.
     *
     * @param identificationNumber the identification number to search for
     * @return list of persons with the specified identification number
     */
    List<PersonEntity> findAllByIdentificationNumber(String identificationNumber);

}
