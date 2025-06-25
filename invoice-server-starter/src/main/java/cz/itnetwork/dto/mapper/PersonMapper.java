
package cz.itnetwork.dto.mapper;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.entity.PersonEntity;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface PersonMapper {

    /**
     * Converts a PersonDTO to a PersonEntity.
     *
     * @param source the DTO to convert
     * @return the corresponding entity
     */
    PersonEntity toEntity(PersonDTO source);

    /**
     * Converts a PersonEntity to a PersonDTO.
     *
     * @param source the entity to convert
     * @return the corresponding DTO
     */
    PersonDTO toDTO(PersonEntity source);
}
