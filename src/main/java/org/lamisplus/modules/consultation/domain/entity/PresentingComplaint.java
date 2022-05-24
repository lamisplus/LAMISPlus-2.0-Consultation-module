package org.lamisplus.modules.consultation.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PresentingComplaint extends Audit<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "complaint")
    private String complaint;
    @Column(name = "onset_date")
    private LocalDate onsetDate;
    @Column(name = "severity")
    private int severity;
    @Column(name = "date_resolved")
    private LocalDate dateResolved;
}
