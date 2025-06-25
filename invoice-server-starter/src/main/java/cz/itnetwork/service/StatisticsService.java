package cz.itnetwork.service;

import cz.itnetwork.dto.GeneralInvoiceStatisticsDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;

import java.util.List;

public interface StatisticsService {

    /**
     * Retrieves general statistics about all invoices, such as total count,
     * total sum, and the sum of this year's invoices.
     *
     * @return general invoice statistics
     */
    GeneralInvoiceStatisticsDTO getGeneralStatistics();

    /**
     * Retrieves summarized invoice statistics grouped by person (seller),
     *
     * @param page  page number for pagination
     * @param limit number of records per page
     * @return list of person-based invoice statistics
     */
    List<PersonStatisticsDTO> getAllPersonStatistics(int page, int limit);

}
