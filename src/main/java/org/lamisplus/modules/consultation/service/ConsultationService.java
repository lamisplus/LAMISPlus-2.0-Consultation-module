package org.lamisplus.modules.consultation.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.consultation.domain.entity.Consultation;
import org.lamisplus.modules.consultation.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultationService {
    @Autowired
    private ConsultationRepository repository;

    public Consultation Save(Consultation consultation){
        return repository.save(consultation);
    }

    public Consultation Update(int id, Consultation consultation){
        return repository.save(consultation);
    }

    public List<Consultation> GetAllEncountersByPatientId(int patientId) {
        return repository.findAllByPatientId(patientId);
    }

    public String Delete(int id) {
        Consultation consultation = repository.findById(id).orElse(null);
        repository.delete(consultation);
        return id + " deleted successfully";
    }
}
