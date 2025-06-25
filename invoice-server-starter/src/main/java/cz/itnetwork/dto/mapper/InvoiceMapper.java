package cz.itnetwork.dto.mapper;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.entity.InvoiceEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    /**
     * Converts an InvoiceDTO to an InvoiceEntity.
     *
     * @param source the DTO to convert
     * @return the corresponding entity
     */
    InvoiceEntity toEntity(InvoiceDTO source);

    /**
     * Converts an InvoiceEntity to an InvoiceDTO.
     *
     * @param source the entity to convert
     * @return the corresponding DTO
     */
    InvoiceDTO toDTO(InvoiceEntity source);
}
