package cz.itnetwork.service;

import cz.itnetwork.dto.GeneralInvoiceStatisticsDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.entity.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class StatisticsServiceImpl implements StatisticsService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    private final int currentYear = LocalDate.now().getYear();


    @Override
    public GeneralInvoiceStatisticsDTO getGeneralStatistics() {
        return invoiceRepository.getGeneralStatistics(currentYear);
    }

    @Override
    public List<PersonStatisticsDTO> getAllPersonStatistics(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return invoiceRepository.getAllPersonStatistics(pageable);
    }
}
