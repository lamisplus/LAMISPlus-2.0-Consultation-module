package org.lamisplus.modules.consultation.domain.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "consultation_diagnosis")
public class Diagnosis extends Audit<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "condition")
    private String condition;
    @Column(name = "diagnosis_order")
    private int diagnosisOrder;
    @Column(name = "certainty")
    private int certainty;
}
