package cz.itnetwork.utils;

import cz.itnetwork.constant.InvoiceRelation;
import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import org.webjars.NotFoundException;

import java.util.List;

public interface EntityFetcherService {

    /**
     * <p>Attempts to fetch a person.</p>
     * <p>In case a person with the passed [id] doesn't exist a [{@link org.webjars.NotFoundException}] is thrown.</p>
     *
     * @param id Person to fetch
     * @return Fetched entity
     * @throws org.webjars.NotFoundException In case a person with the passed [id] isn't found
     */
    PersonEntity fetchPersonById(Long id);

    /**
     * Fetches persons sold or purchased invoices.
     *
     * @param identification String that each person must have (identification number).
     * @param relation       InvoiceRelation decides if you want to fetch purchased or sold invoices.
     * @return List of fetched invoices.
     */
    List<InvoiceDTO> fetchPersonsInvoices(String identification, InvoiceRelation relation);

    /**
     * Retrieves an invoice by its ID from the database.
     *
     * @param id the ID of the invoice to fetch
     * @return the fetched {@link InvoiceEntity}
     * @throws NotFoundException if the invoice with the given ID is not found
     */
    InvoiceEntity fetchInvoiceById(long id);

}
