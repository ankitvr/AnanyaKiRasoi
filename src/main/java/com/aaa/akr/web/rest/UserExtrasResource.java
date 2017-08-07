package com.aaa.akr.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.aaa.akr.domain.UserExtras;

import com.aaa.akr.repository.UserExtrasRepository;
import com.aaa.akr.web.rest.util.HeaderUtil;
import com.aaa.akr.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserExtras.
 */
@RestController
@RequestMapping("/api")
public class UserExtrasResource {

    private final Logger log = LoggerFactory.getLogger(UserExtrasResource.class);

    private static final String ENTITY_NAME = "userExtras";

    private final UserExtrasRepository userExtrasRepository;

    public UserExtrasResource(UserExtrasRepository userExtrasRepository) {
        this.userExtrasRepository = userExtrasRepository;
    }

    /**
     * POST  /user-extras : Create a new userExtras.
     *
     * @param userExtras the userExtras to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userExtras, or with status 400 (Bad Request) if the userExtras has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-extras")
    @Timed
    public ResponseEntity<UserExtras> createUserExtras(@Valid @RequestBody UserExtras userExtras) throws URISyntaxException {
        log.debug("REST request to save UserExtras : {}", userExtras);
        if (userExtras.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new userExtras cannot already have an ID")).body(null);
        }
        UserExtras result = userExtrasRepository.save(userExtras);
        return ResponseEntity.created(new URI("/api/user-extras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-extras : Updates an existing userExtras.
     *
     * @param userExtras the userExtras to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userExtras,
     * or with status 400 (Bad Request) if the userExtras is not valid,
     * or with status 500 (Internal Server Error) if the userExtras couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-extras")
    @Timed
    public ResponseEntity<UserExtras> updateUserExtras(@Valid @RequestBody UserExtras userExtras) throws URISyntaxException {
        log.debug("REST request to update UserExtras : {}", userExtras);
        if (userExtras.getId() == null) {
            return createUserExtras(userExtras);
        }
        UserExtras result = userExtrasRepository.save(userExtras);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userExtras.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-extras : get all the userExtras.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userExtras in body
     */
    @GetMapping("/user-extras")
    @Timed
    public ResponseEntity<List<UserExtras>> getAllUserExtras(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of UserExtras");
        Page<UserExtras> page = userExtrasRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-extras");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-extras/:id : get the "id" userExtras.
     *
     * @param id the id of the userExtras to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userExtras, or with status 404 (Not Found)
     */
    @GetMapping("/user-extras/{id}")
    @Timed
    public ResponseEntity<UserExtras> getUserExtras(@PathVariable Long id) {
        log.debug("REST request to get UserExtras : {}", id);
        UserExtras userExtras = userExtrasRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userExtras));
    }

    /**
     * DELETE  /user-extras/:id : delete the "id" userExtras.
     *
     * @param id the id of the userExtras to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-extras/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserExtras(@PathVariable Long id) {
        log.debug("REST request to delete UserExtras : {}", id);
        userExtrasRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
