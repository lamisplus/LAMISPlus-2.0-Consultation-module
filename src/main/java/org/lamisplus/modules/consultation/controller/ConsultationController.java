package org.lamisplus.modules.consultation.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.consultation.domain.entity.ConsultationEncounter;
import org.lamisplus.modules.consultation.service.ConsultationEncounterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/consultations")
public class ConsultationController {
    private final ConsultationEncounterService service;

    @PostMapping("")
    public ConsultationEncounter Save(@RequestBody ConsultationEncounter encounter){
        return service.Save(encounter);
    }

    @PutMapping("/{id}")
    public ConsultationEncounter Update(@PathVariable int id, @RequestBody ConsultationEncounter encounter){
        return service.Update(id, encounter);
    }

    @GetMapping("/{patient_id}")
    public List<ConsultationEncounter> GetConsultationsByPatientId(@PathVariable int patient_id){
        return service.GetAllEncountersByPatientId(patient_id);
    }

    @DeleteMapping("/{id}")
    public String Delete(@PathVariable Integer id){
        return service.Delete(id);
    }
}
