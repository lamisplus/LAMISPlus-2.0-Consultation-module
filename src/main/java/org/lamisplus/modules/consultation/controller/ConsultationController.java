package org.lamisplus.modules.consultation.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.consultation.domain.entity.Consultation;
import org.lamisplus.modules.consultation.service.ConsultationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/consultations")
public class ConsultationController {
    private final ConsultationService service;

    @PostMapping("")
    public Consultation Save(@RequestBody Consultation encounter){
        return service.Save(encounter);
    }

    @PutMapping("/{id}")
    public Consultation Update(@PathVariable int id, @RequestBody Consultation encounter){
        return service.Update(id, encounter);
    }

    @GetMapping("/{id}")
    public Consultation Load(@PathVariable int id){
        return service.findById(id);
    }

    @GetMapping("/consultations-by-patient-id/{patient_id}")
    public List<Consultation> GetConsultationsByPatientId(@PathVariable int patient_id){
        return service.GetAllEncountersByPatientId(patient_id);
    }

    @DeleteMapping("/{id}")
    public String Delete(@PathVariable Integer id){
        return service.Delete(id);
    }
}
