package com.bizarrestudios.logshieldlab.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bizarrestudios.logshieldlab.model.Incident;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
}