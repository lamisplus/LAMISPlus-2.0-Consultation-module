package org.lamisplus.modules.consultation.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = {"org.lamisplus.modules.consultation.repository"})
public class DomainConfiguration {
}
