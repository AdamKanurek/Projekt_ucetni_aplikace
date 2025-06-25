
package cz.itnetwork.service;

import cz.itnetwork.constant.InvoiceRelation;
import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.mapper.PersonMapper;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.PersonRepository;
import cz.itnetwork.service.exceptions.DuplicateEmailException;
import cz.itnetwork.service.exceptions.DuplicateIdentificationNumberException;
import cz.itnetwork.utils.EntityFetcherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EntityFetcherService entityFetcherService;

    public PersonDTO addPerson(PersonDTO personDTO) {
        try {
            PersonEntity entity = personMapper.toEntity(personDTO);
            entity = personRepository.save(entity);
            return personMapper.toDTO(entity);
        } catch (DataIntegrityViolationException exception) {
            String message = exception.getRootCause() != null ? exception.getRootCause().getMessage() : exception.getMessage();
            if(message.contains("UK_46v03hbccs0qbqsp6xussaam7")){
                throw new DuplicateIdentificationNumberException();
            }
            throw new DuplicateEmailException();
        }
    }

    @Override
    public void removePerson(Long personId) {
        try {
            PersonEntity person = entityFetcherService.fetchPersonById(personId);
            person.setHidden(true);

            personRepository.save(person);
        } catch (NotFoundException ignored) {
            // The contract in the interface states, that no exception is thrown, if the entity is not found.
        }
    }

    @Override
    public List<PersonDTO> getAll(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return personRepository.findByHidden(false, pageable)
                .stream()
                .map(personMapper::toDTO)
                .collect(Collectors.toList());
    }


    @Override
    public PersonDTO getPerson(Long personId) {
        return personMapper.toDTO(entityFetcherService.fetchPersonById(personId));
    }

    @Override
    public PersonDTO editPerson(Long personId, PersonDTO personDTO) {
        PersonEntity person = entityFetcherService.fetchPersonById(personId);
        person.setIdentificationNumber(null);
        person.setMail(null);
        person.setHidden(true);
        personRepository.save(person);

        personDTO.setId(null);

        return addPerson(personDTO);
    }

    @Override
    public List<InvoiceDTO> getAllPersonsPurchases(String identification) {
        return entityFetcherService.fetchPersonsInvoices(identification, InvoiceRelation.PURCHASES);

    }

    @Override
    public List<InvoiceDTO> getAllPersonsSales(String identification) {
        return entityFetcherService.fetchPersonsInvoices(identification, InvoiceRelation.SALES);
    }

}
