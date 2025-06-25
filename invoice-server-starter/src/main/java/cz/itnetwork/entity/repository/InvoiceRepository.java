package cz.itnetwork.entity.repository;

import cz.itnetwork.dto.GeneralInvoiceStatisticsDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.entity.InvoiceEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long>, JpaSpecificationExecutor<InvoiceEntity> {

    /**
     * Retrieves general invoice statistics including the sum of prices for the current year,
     * the total sum of all prices, and the total count of invoices.
     *
     * @param currentYear the year to filter invoices for the current year sum
     * @return a DTO containing aggregated invoice statistics
     */
    @Query("SELECT new cz.itnetwork.dto.GeneralInvoiceStatisticsDTO(" +
            "SUM(CASE WHEN YEAR(i.issued) = :currentYear THEN CAST(i.price AS java.math.BigDecimal) ELSE CAST(0 AS java.math.BigDecimal) END), " +
            "SUM(CAST(i.price AS java.math.BigDecimal)), " +
            "COUNT(i)) " +
            "FROM invoice i")
    GeneralInvoiceStatisticsDTO getGeneralStatistics(@Param("currentYear") int currentYear);

    /**
     * Retrieves statistics grouped by seller including seller's ID, identification number, name,
     * and the total sum of invoice prices.
     *
     * @param pageable pagination information
     * @return list of person statistics DTOs aggregated by seller
     */
    @Query("SELECT new cz.itnetwork.dto.PersonStatisticsDTO(" +
            "i.seller.id, " +
            "i.seller.identificationNumber, " +
            "i.seller.name, " +
            "SUM(CAST(i.price AS java.math.BigDecimal))) " +
            "FROM invoice i " +
            "GROUP BY i.seller.id, i.seller.name")
    List<PersonStatisticsDTO> getAllPersonStatistics(Pageable pageable);

}
