package cz.itnetwork.controller;

import cz.itnetwork.dto.GeneralInvoiceStatisticsDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;


    /**
     * Retrieves general statistics about invoices.
     *
     * @return general invoice statistics DTO
     */
    @GetMapping("/invoices/statistics")
    public GeneralInvoiceStatisticsDTO getGeneralStatistics() {
        return statisticsService.getGeneralStatistics();
    }

    /**
     * Retrieves paginated statistics about persons.
     *
     * @param page  the page number to retrieve (default is 0)
     * @param limit the number of records per page (default is 15)
     * @return list of person statistics DTOs
     */
    @GetMapping("/persons/statistics")
    public List<PersonStatisticsDTO> getAllPersonStatistics(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int limit
    ) {
        return statisticsService.getAllPersonStatistics(page, limit);
    }
}
