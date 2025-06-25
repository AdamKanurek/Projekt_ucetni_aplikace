package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import org.springframework.data.domain.Page;

public interface InvoiceService {

    /**
     * Creates a new Invoice
     *
     * @param invoiceDTO Invoice to create
     * @return newly created invoice
     */
    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    /**
     * Retrieves a paginated list of invoices filtered by the given criteria.
     *
     * @param invoiceFilter the filter criteria for invoices
     * @return a page of InvoiceDTO matching the filter
     */
    Page<InvoiceDTO> getAll(InvoiceFilter invoiceFilter);

    /**
     * Retrieves a single invoice by its ID.
     *
     * @param invoiceId the ID of the invoice
     * @return the corresponding InvoiceDTO
     */
    InvoiceDTO getInvoice(Long invoiceId);

    /**
     * Updates an existing invoice identified by its ID.
     *
     * @param invoiceId  the ID of the invoice to update
     * @param invoiceDTO the updated invoice data
     * @return the updated InvoiceDTO
     */
    InvoiceDTO editInvoice(Long invoiceId, InvoiceDTO invoiceDTO);

    /**
     * Marks an invoice as removed or deletes it by its ID.
     *
     * @param invoiceId the ID of the invoice to remove
     * @return the removed InvoiceDTO
     */
    InvoiceDTO removeInvoice(Long invoiceId);
}
