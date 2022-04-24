package org.lamisplus.modules.consultation.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.consultation.domain.entity.Encounter;
import org.lamisplus.modules.consultation.service.EncounterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/consultation/encounters")
public class ConsultationEncounterController {
    private final EncounterService service;

    @PostMapping("")
    public Encounter SaveEncounter(@RequestBody Encounter encounter){
        return service.Save(encounter);
    }

    @PutMapping("/{id}")
    public Encounter UpdateEncounter(@PathVariable int id, @RequestBody Encounter encounter){
        return service.Update(id, encounter);
    }

    @GetMapping("/{patient_id}/{category}")
    public List<Encounter> GetEncounterByPatientId(@PathVariable int patient_id, @PathVariable String category){
        return service.GetAllEncountersByPatientId(patient_id, category);
    }

    @DeleteMapping("/{id}")
    public String Delete(@PathVariable Integer id){
        return service.Delete(id);
    }
}
