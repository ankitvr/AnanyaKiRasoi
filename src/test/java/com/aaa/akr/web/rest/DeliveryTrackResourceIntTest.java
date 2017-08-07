package com.aaa.akr.web.rest;

import com.aaa.akr.AnanyaKiRasoiApp;

import com.aaa.akr.domain.DeliveryTrack;
import com.aaa.akr.repository.DeliveryTrackRepository;
import com.aaa.akr.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.aaa.akr.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.aaa.akr.domain.enumeration.DeliveryStatus;
/**
 * Test class for the DeliveryTrackResource REST controller.
 *
 * @see DeliveryTrackResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AnanyaKiRasoiApp.class)
public class DeliveryTrackResourceIntTest {

    private static final ZonedDateTime DEFAULT_ESTIMATED_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ESTIMATED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final DeliveryStatus DEFAULT_STATUS = DeliveryStatus.IN_MAKING;
    private static final DeliveryStatus UPDATED_STATUS = DeliveryStatus.ON_WAY;

    @Autowired
    private DeliveryTrackRepository deliveryTrackRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeliveryTrackMockMvc;

    private DeliveryTrack deliveryTrack;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DeliveryTrackResource deliveryTrackResource = new DeliveryTrackResource(deliveryTrackRepository);
        this.restDeliveryTrackMockMvc = MockMvcBuilders.standaloneSetup(deliveryTrackResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryTrack createEntity(EntityManager em) {
        DeliveryTrack deliveryTrack = new DeliveryTrack()
            .estimatedTime(DEFAULT_ESTIMATED_TIME)
            .status(DEFAULT_STATUS);
        return deliveryTrack;
    }

    @Before
    public void initTest() {
        deliveryTrack = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliveryTrack() throws Exception {
        int databaseSizeBeforeCreate = deliveryTrackRepository.findAll().size();

        // Create the DeliveryTrack
        restDeliveryTrackMockMvc.perform(post("/api/delivery-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryTrack)))
            .andExpect(status().isCreated());

        // Validate the DeliveryTrack in the database
        List<DeliveryTrack> deliveryTrackList = deliveryTrackRepository.findAll();
        assertThat(deliveryTrackList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryTrack testDeliveryTrack = deliveryTrackList.get(deliveryTrackList.size() - 1);
        assertThat(testDeliveryTrack.getEstimatedTime()).isEqualTo(DEFAULT_ESTIMATED_TIME);
        assertThat(testDeliveryTrack.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createDeliveryTrackWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryTrackRepository.findAll().size();

        // Create the DeliveryTrack with an existing ID
        deliveryTrack.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryTrackMockMvc.perform(post("/api/delivery-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryTrack)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<DeliveryTrack> deliveryTrackList = deliveryTrackRepository.findAll();
        assertThat(deliveryTrackList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDeliveryTracks() throws Exception {
        // Initialize the database
        deliveryTrackRepository.saveAndFlush(deliveryTrack);

        // Get all the deliveryTrackList
        restDeliveryTrackMockMvc.perform(get("/api/delivery-tracks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryTrack.getId().intValue())))
            .andExpect(jsonPath("$.[*].estimatedTime").value(hasItem(sameInstant(DEFAULT_ESTIMATED_TIME))))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getDeliveryTrack() throws Exception {
        // Initialize the database
        deliveryTrackRepository.saveAndFlush(deliveryTrack);

        // Get the deliveryTrack
        restDeliveryTrackMockMvc.perform(get("/api/delivery-tracks/{id}", deliveryTrack.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryTrack.getId().intValue()))
            .andExpect(jsonPath("$.estimatedTime").value(sameInstant(DEFAULT_ESTIMATED_TIME)))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDeliveryTrack() throws Exception {
        // Get the deliveryTrack
        restDeliveryTrackMockMvc.perform(get("/api/delivery-tracks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliveryTrack() throws Exception {
        // Initialize the database
        deliveryTrackRepository.saveAndFlush(deliveryTrack);
        int databaseSizeBeforeUpdate = deliveryTrackRepository.findAll().size();

        // Update the deliveryTrack
        DeliveryTrack updatedDeliveryTrack = deliveryTrackRepository.findOne(deliveryTrack.getId());
        updatedDeliveryTrack
            .estimatedTime(UPDATED_ESTIMATED_TIME)
            .status(UPDATED_STATUS);

        restDeliveryTrackMockMvc.perform(put("/api/delivery-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeliveryTrack)))
            .andExpect(status().isOk());

        // Validate the DeliveryTrack in the database
        List<DeliveryTrack> deliveryTrackList = deliveryTrackRepository.findAll();
        assertThat(deliveryTrackList).hasSize(databaseSizeBeforeUpdate);
        DeliveryTrack testDeliveryTrack = deliveryTrackList.get(deliveryTrackList.size() - 1);
        assertThat(testDeliveryTrack.getEstimatedTime()).isEqualTo(UPDATED_ESTIMATED_TIME);
        assertThat(testDeliveryTrack.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliveryTrack() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTrackRepository.findAll().size();

        // Create the DeliveryTrack

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDeliveryTrackMockMvc.perform(put("/api/delivery-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryTrack)))
            .andExpect(status().isCreated());

        // Validate the DeliveryTrack in the database
        List<DeliveryTrack> deliveryTrackList = deliveryTrackRepository.findAll();
        assertThat(deliveryTrackList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDeliveryTrack() throws Exception {
        // Initialize the database
        deliveryTrackRepository.saveAndFlush(deliveryTrack);
        int databaseSizeBeforeDelete = deliveryTrackRepository.findAll().size();

        // Get the deliveryTrack
        restDeliveryTrackMockMvc.perform(delete("/api/delivery-tracks/{id}", deliveryTrack.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DeliveryTrack> deliveryTrackList = deliveryTrackRepository.findAll();
        assertThat(deliveryTrackList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryTrack.class);
        DeliveryTrack deliveryTrack1 = new DeliveryTrack();
        deliveryTrack1.setId(1L);
        DeliveryTrack deliveryTrack2 = new DeliveryTrack();
        deliveryTrack2.setId(deliveryTrack1.getId());
        assertThat(deliveryTrack1).isEqualTo(deliveryTrack2);
        deliveryTrack2.setId(2L);
        assertThat(deliveryTrack1).isNotEqualTo(deliveryTrack2);
        deliveryTrack1.setId(null);
        assertThat(deliveryTrack1).isNotEqualTo(deliveryTrack2);
    }
}
