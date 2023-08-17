package com.dennis.Vending.Machine.API.repository;
import com.dennis.Vending.Machine.API.model.Admin;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Long> {
}
