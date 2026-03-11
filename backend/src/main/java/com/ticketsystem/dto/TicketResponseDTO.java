package com.ticketsystem.dto;

import com.ticketsystem.model.Ticket;
import lombok.Data;
import java.time.format.DateTimeFormatter;

@Data
public class TicketResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String createdAt;
    private String formattedDate;
    
    public static TicketResponseDTO fromEntity(Ticket ticket) {
        TicketResponseDTO dto = new TicketResponseDTO();
        dto.setId(ticket.getId());
        dto.setTitle(ticket.getTitle());
        dto.setDescription(ticket.getDescription());
        dto.setStatus(ticket.getStatus().toString());
        dto.setCreatedAt(ticket.getCreatedAt().toString());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        dto.setFormattedDate(ticket.getCreatedAt().format(formatter));
        return dto;
    }
}