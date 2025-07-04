package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;


    /**
     * Adds a new invoice. Only accessible by users with the ADMIN role.
     *
     * @param invoiceDTO the invoice data to add
     * @return the added invoice data
     */
    @Secured("ROLE_ADMIN")
    @PostMapping("/invoices")
    public InvoiceDTO addInvoice(@RequestBody @Valid InvoiceDTO invoiceDTO) {
        return invoiceService.addInvoice(invoiceDTO);
    }

    /**
     * Retrieves a paginated list of invoices filtered by given criteria.
     *
     * @param filter the criteria to filter invoices
     * @return a page of filtered invoices
     */
    @GetMapping("/invoices")
    public Page<InvoiceDTO> getAllInvoices(InvoiceFilter filter) {
        return invoiceService.getAll(filter);
    }


    /**
     * Retrieves the invoice details for a specific invoice ID.
     *
     * @param invoiceId the ID of the invoice to retrieve
     * @return the invoice data
     */
    @GetMapping("/invoices/{invoiceId}")
    public InvoiceDTO getInvoice(@PathVariable Long invoiceId) {
        return invoiceService.getInvoice(invoiceId);
    }

    /**
     * Edits an existing invoice identified by its ID. Only accessible by users with the ADMIN role.
     *
     * @param invoiceId  the ID of the invoice to edit
     * @param invoiceDTO the updated invoice data
     * @return the updated invoice data
     */
    @Secured("ROLE_ADMIN")
    @PutMapping("/invoices/{invoiceId}")
    public InvoiceDTO editInvoice(@PathVariable Long invoiceId, @RequestBody @Valid InvoiceDTO invoiceDTO) {
        return invoiceService.editInvoice(invoiceId, invoiceDTO);
    }

    /**
     * Removes the invoice identified by its ID. Only accessible by users with the ADMIN role.
     *
     * @param invoiceId the ID of the invoice to remove
     * @return the removed invoice data
     */
    @Secured("ROLE_ADMIN")
    @DeleteMapping("/invoices/{invoiceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public InvoiceDTO removeInvoice(@PathVariable Long invoiceId) {
        return invoiceService.removeInvoice(invoiceId);
    }
}
