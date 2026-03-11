package com.ticketsystem.repository;

import com.ticketsystem.model.Ticket;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class TicketRepository {
    private final ConcurrentHashMap<Long, Ticket> tickets = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    public Ticket save(Ticket ticket) {
        if (ticket.getId() == null) {
            ticket.setId(idGenerator.getAndIncrement());
        }
        tickets.put(ticket.getId(), ticket);
        return ticket;
    }
    
    public Optional<Ticket> findById(Long id) {
        return Optional.ofNullable(tickets.get(id));
    }
    
    public List<Ticket> findAll() {
        return new ArrayList<>(tickets.values());
    }
    
    public void deleteById(Long id) {
        tickets.remove(id);
    }
    
    public boolean existsById(Long id) {
        return tickets.containsKey(id);
    }
}