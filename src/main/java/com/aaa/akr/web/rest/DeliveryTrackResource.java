package com.aaa.akr.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.aaa.akr.domain.DeliveryTrack;

import com.aaa.akr.repository.DeliveryTrackRepository;
import com.aaa.akr.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing DeliveryTrack.
 */
@RestController
@RequestMapping("/api")
public class DeliveryTrackResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryTrackResource.class);

    private static final String ENTITY_NAME = "deliveryTrack";

    private final DeliveryTrackRepository deliveryTrackRepository;

    public DeliveryTrackResource(DeliveryTrackRepository deliveryTrackRepository) {
        this.deliveryTrackRepository = deliveryTrackRepository;
    }

    /**
     * POST  /delivery-tracks : Create a new deliveryTrack.
     *
     * @param deliveryTrack the deliveryTrack to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deliveryTrack, or with status 400 (Bad Request) if the deliveryTrack has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delivery-tracks")
    @Timed
    public ResponseEntity<DeliveryTrack> createDeliveryTrack(@RequestBody DeliveryTrack deliveryTrack) throws URISyntaxException {
        log.debug("REST request to save DeliveryTrack : {}", deliveryTrack);
        if (deliveryTrack.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new deliveryTrack cannot already have an ID")).body(null);
        }
        DeliveryTrack result = deliveryTrackRepository.save(deliveryTrack);
        return ResponseEntity.created(new URI("/api/delivery-tracks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delivery-tracks : Updates an existing deliveryTrack.
     *
     * @param deliveryTrack the deliveryTrack to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deliveryTrack,
     * or with status 400 (Bad Request) if the deliveryTrack is not valid,
     * or with status 500 (Internal Server Error) if the deliveryTrack couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delivery-tracks")
    @Timed
    public ResponseEntity<DeliveryTrack> updateDeliveryTrack(@RequestBody DeliveryTrack deliveryTrack) throws URISyntaxException {
        log.debug("REST request to update DeliveryTrack : {}", deliveryTrack);
        if (deliveryTrack.getId() == null) {
            return createDeliveryTrack(deliveryTrack);
        }
        DeliveryTrack result = deliveryTrackRepository.save(deliveryTrack);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deliveryTrack.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delivery-tracks : get all the deliveryTracks.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of deliveryTracks in body
     */
    @GetMapping("/delivery-tracks")
    @Timed
    public List<DeliveryTrack> getAllDeliveryTracks(@RequestParam(required = false) String filter) {
        if ("userextras-is-null".equals(filter)) {
            log.debug("REST request to get all DeliveryTracks where userExtras is null");
            return StreamSupport
                .stream(deliveryTrackRepository.findAll().spliterator(), false)
                .filter(deliveryTrack -> deliveryTrack.getUserExtras() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all DeliveryTracks");
        return deliveryTrackRepository.findAll();
    }

    /**
     * GET  /delivery-tracks/:id : get the "id" deliveryTrack.
     *
     * @param id the id of the deliveryTrack to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deliveryTrack, or with status 404 (Not Found)
     */
    @GetMapping("/delivery-tracks/{id}")
    @Timed
    public ResponseEntity<DeliveryTrack> getDeliveryTrack(@PathVariable Long id) {
        log.debug("REST request to get DeliveryTrack : {}", id);
        DeliveryTrack deliveryTrack = deliveryTrackRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(deliveryTrack));
    }

    /**
     * DELETE  /delivery-tracks/:id : delete the "id" deliveryTrack.
     *
     * @param id the id of the deliveryTrack to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delivery-tracks/{id}")
    @Timed
    public ResponseEntity<Void> deleteDeliveryTrack(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryTrack : {}", id);
        deliveryTrackRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
