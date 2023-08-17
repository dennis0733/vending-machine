package com.dennis.Vending.Machine.API.controller;

import com.dennis.Vending.Machine.API.model.Item;
import com.dennis.Vending.Machine.API.repository.AdminRepository;
import com.dennis.Vending.Machine.API.repository.ItemRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class ControllerTest {

    @Autowired
    private MockMvc mockMvc;





    @Test
    public void getAllItems() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders
            .get("/items")
            .accept(MediaType.APPLICATION_JSON))
        .andDo(print())
            .andExpect(status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].name").value("Water"))
    .andExpect(MockMvcResultMatchers.jsonPath("$.[1].name").value("Coke"))
    .andExpect(MockMvcResultMatchers.jsonPath("$.[2].name").value("Soda"));


    }

    @Test
    public void matchPassword() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/password/1234")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void updatePrice() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/updateprice/1/10")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Water"));

    }

    @Test
    public void updateQuantity() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/updatequantity/2/10")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Coke"));
    }

    @Test
    public void getMoney() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/totalmoney")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }


    @Test
    public void updateMoney() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/updatemoney/10")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.password").value("Ybjsm+iZ9gldZB0EzxKVrg=="));
    }

}