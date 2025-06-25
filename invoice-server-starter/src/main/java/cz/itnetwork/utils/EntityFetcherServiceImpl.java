package cz.itnetwork.utils;

import cz.itnetwork.constant.InvoiceRelation;
import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntityFetcherServiceImpl implements EntityFetcherService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Override
    public PersonEntity fetchPersonById(Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Person with id " + id + " wasn't found in the database."));
    }

    @Override
    public List<InvoiceDTO> fetchPersonsInvoices(String identification, InvoiceRelation relation) {
        List<PersonEntity> persons = personRepository.findAllByIdentificationNumber(identification);

        return persons.stream()
                .flatMap(person -> {
                    if (relation == InvoiceRelation.SALES) {
                        return person.getSales().stream();
                    } else {
                        return person.getPurchases().stream();
                    }
                })
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceEntity fetchInvoiceById(long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + id + " wasn't found in the database."));
    }

}
