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


    @GetMapping("/invoices/statistics")
    public GeneralInvoiceStatisticsDTO getGeneralStatistics() {
        return statisticsService.getGeneralStatistics();
    }

    @GetMapping("/persons/statistics")
    public List<PersonStatisticsDTO> getAllPersonStatistics(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int limit
    ) {
        return statisticsService.getAllPersonStatistics(page, limit);
    }
}
