package br.com.appprova.appinventory.web.rest;

import br.com.appprova.appinventory.security.AuthoritiesConstants;
import com.codahale.metrics.annotation.Timed;
import br.com.appprova.appinventory.domain.Device;

import br.com.appprova.appinventory.repository.DeviceRepository;
import br.com.appprova.appinventory.web.rest.errors.BadRequestAlertException;
import br.com.appprova.appinventory.web.rest.util.HeaderUtil;
import br.com.appprova.appinventory.web.rest.util.PaginationUtil;
import br.com.appprova.appinventory.service.dto.DeviceDTO;
import br.com.appprova.appinventory.service.mapper.DeviceMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Device.
 */
@RestController
@RequestMapping("/api")
public class DeviceResource {

    private final Logger log = LoggerFactory.getLogger(DeviceResource.class);

    private static final String ENTITY_NAME = "device";

    private final DeviceRepository deviceRepository;

    private final DeviceMapper deviceMapper;

    public DeviceResource(DeviceRepository deviceRepository, DeviceMapper deviceMapper) {
        this.deviceRepository = deviceRepository;
        this.deviceMapper = deviceMapper;
    }

    /**
     * POST  /devices : Create a new device.
     *
     * @param deviceDTO the deviceDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deviceDTO, or with status 400 (Bad Request) if the device has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/devices")
    @Timed
    public ResponseEntity<DeviceDTO> createDevice(@RequestBody DeviceDTO deviceDTO) throws URISyntaxException {
        log.debug("REST request to save Device : {}", deviceDTO);
        if (deviceDTO.getId() != null) {
            throw new BadRequestAlertException("A new device cannot already have an ID", ENTITY_NAME, "idexists");
        }
        deviceDTO.setCreated(ZonedDateTime.now());
        Device device = deviceMapper.toEntity(deviceDTO);
        device = deviceRepository.save(device);
        DeviceDTO result = deviceMapper.toDto(device);
        return ResponseEntity.created(new URI("/api/devices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /devices : Updates an existing device.
     *
     * @param deviceDTO the deviceDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deviceDTO,
     * or with status 400 (Bad Request) if the deviceDTO is not valid,
     * or with status 500 (Internal Server Error) if the deviceDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/devices")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<DeviceDTO> updateDevice(@RequestBody DeviceDTO deviceDTO) throws URISyntaxException {
        log.debug("REST request to update Device : {}", deviceDTO);
        if (deviceDTO.getId() == null) {
            return createDevice(deviceDTO);
        }
        Device device = deviceMapper.toEntity(deviceDTO);
        device = deviceRepository.save(device);
        DeviceDTO result = deviceMapper.toDto(device);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deviceDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /devices : get all the devices.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of devices in body
     */
    @GetMapping("/devices")
    @Timed
    @Secured({AuthoritiesConstants.ADMIN, AuthoritiesConstants.USER})
    public ResponseEntity<List<DeviceDTO>> getAllDevices(Pageable pageable) {
        log.debug("REST request to get a page of Devices");
        Page<Device> page = deviceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/devices");
        List<DeviceDTO> deviceDTOList = deviceMapper.toDto(page.getContent());
        // Remove device notes when not getting specific device
        deviceDTOList.forEach(deviceDTO -> {
            deviceDTO.setNotes("");
        });
        return new ResponseEntity<>(deviceDTOList, headers, HttpStatus.OK);
    }

    /**
     * GET  /devices/:id : get the "id" device.
     *
     * @param id the id of the deviceDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deviceDTO, or with status 404 (Not Found)
     */
    @GetMapping("/devices/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ADMIN, AuthoritiesConstants.USER})
    public ResponseEntity<DeviceDTO> getDevice(@PathVariable Long id) {
        log.debug("REST request to get Device : {}", id);
        Device device = deviceRepository.findOne(id);
        DeviceDTO deviceDTO = deviceMapper.toDto(device);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(deviceDTO));
    }

    /**
     * DELETE  /devices/:id : delete the "id" device.
     *
     * @param id the id of the deviceDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/devices/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        log.debug("REST request to delete Device : {}", id);
        deviceRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
