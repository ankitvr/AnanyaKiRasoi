package com.aaa.akr.web.rest;

import com.aaa.akr.AnanyaKiRasoiApp;

import com.aaa.akr.domain.UserExtras;
import com.aaa.akr.repository.UserExtrasRepository;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserExtrasResource REST controller.
 *
 * @see UserExtrasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AnanyaKiRasoiApp.class)
public class UserExtrasResourceIntTest {

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    @Autowired
    private UserExtrasRepository userExtrasRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserExtrasMockMvc;

    private UserExtras userExtras;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserExtrasResource userExtrasResource = new UserExtrasResource(userExtrasRepository);
        this.restUserExtrasMockMvc = MockMvcBuilders.standaloneSetup(userExtrasResource)
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
    public static UserExtras createEntity(EntityManager em) {
        UserExtras userExtras = new UserExtras()
            .telephone(DEFAULT_TELEPHONE);
        return userExtras;
    }

    @Before
    public void initTest() {
        userExtras = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserExtras() throws Exception {
        int databaseSizeBeforeCreate = userExtrasRepository.findAll().size();

        // Create the UserExtras
        restUserExtrasMockMvc.perform(post("/api/user-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtras)))
            .andExpect(status().isCreated());

        // Validate the UserExtras in the database
        List<UserExtras> userExtrasList = userExtrasRepository.findAll();
        assertThat(userExtrasList).hasSize(databaseSizeBeforeCreate + 1);
        UserExtras testUserExtras = userExtrasList.get(userExtrasList.size() - 1);
        assertThat(testUserExtras.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
    }

    @Test
    @Transactional
    public void createUserExtrasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userExtrasRepository.findAll().size();

        // Create the UserExtras with an existing ID
        userExtras.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserExtrasMockMvc.perform(post("/api/user-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtras)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<UserExtras> userExtrasList = userExtrasRepository.findAll();
        assertThat(userExtrasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = userExtrasRepository.findAll().size();
        // set the field null
        userExtras.setTelephone(null);

        // Create the UserExtras, which fails.

        restUserExtrasMockMvc.perform(post("/api/user-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtras)))
            .andExpect(status().isBadRequest());

        List<UserExtras> userExtrasList = userExtrasRepository.findAll();
        assertThat(userExtrasList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserExtras() throws Exception {
        // Initialize the database
        userExtrasRepository.saveAndFlush(userExtras);

        // Get all the userExtrasList
        restUserExtrasMockMvc.perform(get("/api/user-extras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userExtras.getId().intValue())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())));
    }

    @Test
    @Transactional
    public void getUserExtras() throws Exception {
        // Initialize the database
        userExtrasRepository.saveAndFlush(userExtras);

        // Get the userExtras
        restUserExtrasMockMvc.perform(get("/api/user-extras/{id}", userExtras.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userExtras.getId().intValue()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserExtras() throws Exception {
        // Get the userExtras
        restUserExtrasMockMvc.perform(get("/api/user-extras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserExtras() throws Exception {
        // Initialize the database
        userExtrasRepository.saveAndFlush(userExtras);
        int databaseSizeBeforeUpdate = userExtrasRepository.findAll().size();

        // Update the userExtras
        UserExtras updatedUserExtras = userExtrasRepository.findOne(userExtras.getId());
        updatedUserExtras
            .telephone(UPDATED_TELEPHONE);

        restUserExtrasMockMvc.perform(put("/api/user-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserExtras)))
            .andExpect(status().isOk());

        // Validate the UserExtras in the database
        List<UserExtras> userExtrasList = userExtrasRepository.findAll();
        assertThat(userExtrasList).hasSize(databaseSizeBeforeUpdate);
        UserExtras testUserExtras = userExtrasList.get(userExtrasList.size() - 1);
        assertThat(testUserExtras.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserExtras() throws Exception {
        int databaseSizeBeforeUpdate = userExtrasRepository.findAll().size();

        // Create the UserExtras

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserExtrasMockMvc.perform(put("/api/user-extras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtras)))
            .andExpect(status().isCreated());

        // Validate the UserExtras in the database
        List<UserExtras> userExtrasList = userExtrasRepository.findAll();
        assertThat(userExtrasList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserExtras() throws Exception {
        // Initialize the database
        userExtrasRepository.saveAndFlush(userExtras);
        int databaseSizeBeforeDelete = userExtrasRepository.findAll().size();

        // Get the userExtras
        restUserExtrasMockMvc.perform(delete("/api/user-extras/{id}", userExtras.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserExtras> userExtrasList = userExtrasRepository.findAll();
        assertThat(userExtrasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserExtras.class);
        UserExtras userExtras1 = new UserExtras();
        userExtras1.setId(1L);
        UserExtras userExtras2 = new UserExtras();
        userExtras2.setId(userExtras1.getId());
        assertThat(userExtras1).isEqualTo(userExtras2);
        userExtras2.setId(2L);
        assertThat(userExtras1).isNotEqualTo(userExtras2);
        userExtras1.setId(null);
        assertThat(userExtras1).isNotEqualTo(userExtras2);
    }
}
