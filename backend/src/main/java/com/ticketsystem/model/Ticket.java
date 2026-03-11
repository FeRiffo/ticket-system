package com.ticketsystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    private Long id;
    private String title;
    private String description;
    private TicketStatus status;
    private LocalDateTime createdAt;
    
    public Ticket(String title, String description) {
        this.title = title;
        this.description = description;
        this.status = TicketStatus.OPEN;
        this.createdAt = LocalDateTime.now();
    }
}