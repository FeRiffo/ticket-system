package com.ticketsystem.dto;

import com.ticketsystem.model.TicketStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StatusUpdateDTO {
    @NotNull(message = "Status é obrigatório")
    private TicketStatus status;
}