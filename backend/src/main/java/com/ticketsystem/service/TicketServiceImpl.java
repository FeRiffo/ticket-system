package com.ticketsystem.service;

import com.ticketsystem.dto.TicketRequestDTO;
import com.ticketsystem.dto.TicketResponseDTO;
import com.ticketsystem.exception.TicketNotFoundException;
import com.ticketsystem.model.Ticket;
import com.ticketsystem.model.TicketStatus;
import com.ticketsystem.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    
    private final TicketRepository ticketRepository;
    
    @Override
    public TicketResponseDTO createTicket(TicketRequestDTO request) {
        Ticket ticket = new Ticket(request.getTitle(), request.getDescription());
        Ticket savedTicket = ticketRepository.save(ticket);
        return TicketResponseDTO.fromEntity(savedTicket);
    }
    
    @Override
    public List<TicketResponseDTO> getAllTickets() {
        return ticketRepository.findAll()
                .stream()
                .map(TicketResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }
    
    @Override
    public TicketResponseDTO getTicketById(Long id) {
        Ticket ticket = findTicketOrThrow(id);
        return TicketResponseDTO.fromEntity(ticket);
    }
    
    @Override
    public TicketResponseDTO updateTicketStatus(Long id, TicketStatus status) {
        Ticket ticket = findTicketOrThrow(id);
        ticket.setStatus(status);
        Ticket updatedTicket = ticketRepository.save(ticket);
        return TicketResponseDTO.fromEntity(updatedTicket);
    }
    
    @Override
    public void deleteTicket(Long id) {
        if (!ticketRepository.existsById(id)) {
            throw new TicketNotFoundException("Ticket não encontrado com ID: " + id);
        }
        ticketRepository.deleteById(id);
    }
    
    private Ticket findTicketOrThrow(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException("Ticket não encontrado com ID: " + id));
    }
}