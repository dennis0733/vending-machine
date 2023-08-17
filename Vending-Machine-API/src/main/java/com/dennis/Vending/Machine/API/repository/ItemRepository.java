package com.dennis.Vending.Machine.API.repository;

import com.dennis.Vending.Machine.API.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item,Long>{


}
