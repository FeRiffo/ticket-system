package com.ticketsystem.service;

import com.ticketsystem.dto.TicketRequestDTO;
import com.ticketsystem.dto.TicketResponseDTO;
import com.ticketsystem.model.TicketStatus;
import java.util.List;

public interface TicketService {
    TicketResponseDTO createTicket(TicketRequestDTO request);
    List<TicketResponseDTO> getAllTickets();
    TicketResponseDTO getTicketById(Long id);
    TicketResponseDTO updateTicketStatus(Long id, TicketStatus status);
    void deleteTicket(Long id);
}