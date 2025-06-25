package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.specification.InvoiceSpecification;
import cz.itnetwork.service.exceptions.DuplicateInvoiceNumberException;
import cz.itnetwork.utils.EntityFetcherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private EntityFetcherService entityFetcherService;

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        try {
            validateInvoice(invoiceDTO);

            InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);

            PersonEntity buyer = entityFetcherService.fetchPersonById(entity.getBuyer().getId());
            PersonEntity seller = entityFetcherService.fetchPersonById(entity.getSeller().getId());

            entity.setBuyer(buyer);
            entity.setSeller(seller);

            InvoiceEntity savedEntity = invoiceRepository.save(entity);

            return invoiceMapper.toDTO(savedEntity);

        } catch (DataIntegrityViolationException exception) {
            throw new DuplicateInvoiceNumberException();
        }
    }

    @Override
    public Page<InvoiceDTO> getAll(InvoiceFilter invoiceFilter) {
        InvoiceSpecification specification = new InvoiceSpecification(invoiceFilter);
        PageRequest pageRequest = PageRequest.of(invoiceFilter.getPage(), invoiceFilter.getLimit());
        Page<InvoiceEntity> invoicePage = invoiceRepository.findAll(specification, pageRequest);
        return invoicePage.map(invoiceMapper::toDTO);
    }


    @Override
    public InvoiceDTO getInvoice(Long invoiceId) {
        return invoiceMapper.toDTO(entityFetcherService.fetchInvoiceById(invoiceId));
    }

    @Override
    public InvoiceDTO editInvoice(Long invoiceId, InvoiceDTO invoiceDTO) {
        try {
            validateInvoice(invoiceDTO);

            InvoiceEntity entity = entityFetcherService.fetchInvoiceById(invoiceId);

            InvoiceEntity editedInvoice = invoiceMapper.toEntity(invoiceDTO);
            PersonEntity seller = entityFetcherService.fetchPersonById(editedInvoice.getSeller().getId());
            PersonEntity buyer = entityFetcherService.fetchPersonById(editedInvoice.getBuyer().getId());

            editedInvoice.setId(entity.getId());
            editedInvoice.setSeller(seller);
            editedInvoice.setBuyer(buyer);

            invoiceRepository.save(editedInvoice);

            return invoiceMapper.toDTO(editedInvoice);
        } catch (DataIntegrityViolationException exception) {
            throw new DuplicateInvoiceNumberException();
        }
    }

    @Override
    public InvoiceDTO removeInvoice(Long invoiceId) {
        InvoiceEntity entity = entityFetcherService.fetchInvoiceById(invoiceId);
        InvoiceDTO model = invoiceMapper.toDTO(entity);
        invoiceRepository.delete(entity);

        return model;
    }

    // region: Private methods

    /**
     * Validates invoice business rules:
     * 1. Due date must not be before the issued date.
     * 2. Buyer and seller must not be the same entity.
     *
     * @param invoiceDTO the invoice data to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validateInvoice(InvoiceDTO invoiceDTO) {
        if (invoiceDTO.getDueDate().isBefore(invoiceDTO.getIssued())) {
            throw new IllegalArgumentException("Datum splatnosti nemůže být před datem vystavení");
        }

        if (invoiceDTO.getBuyer().getId().equals(invoiceDTO.getSeller().getId())) {
            throw new IllegalArgumentException("Nelze vystavit fakturu sám sobě");
        }
    }

}
