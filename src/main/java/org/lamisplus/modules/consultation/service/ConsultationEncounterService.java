package org.lamisplus.modules.consultation.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.consultation.domain.entity.ConsultationEncounter;
import org.lamisplus.modules.consultation.repository.ConsultationEncounterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultationEncounterService {
    @Autowired
    private ConsultationEncounterRepository repository;

    public ConsultationEncounter Save(ConsultationEncounter encounter){
        return repository.Save(encounter);
    }

    public ConsultationEncounter Update(int id, ConsultationEncounter encounter){
        return repository.Update(id, encounter);
    }

    public List<ConsultationEncounter> GetAllEncountersByPatientId(int patient_id) {
        return repository.findEncounterByPatientId(patient_id);
    }

    public String Delete(int id) {
        return repository.Delete(id);
    }
}
