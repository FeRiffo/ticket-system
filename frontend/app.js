// Configuração da API
const API_BASE_URL = 'http://localhost:8080/tickets';

// Elementos do DOM
const ticketsContainer = document.getElementById('ticketsContainer');
const ticketForm = document.getElementById('ticketForm');
const alertContainer = document.getElementById('alertContainer');
const statusFilter = document.getElementById('statusFilter');

// Estado da aplicação
let tickets = [];

// Função para mostrar alertas
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // Remover alerta após 5 segundos
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Função para fazer requisições com tratamento de erro
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro na requisição');
        }

        return await response.json();
    } catch (error) {
        showAlert(error.message, 'error');
        throw error;
    }
}

// Função para buscar todos os tickets
async function fetchTickets() {
    try {
        tickets = await apiRequest(API_BASE_URL);
        renderTickets();
    } catch (error) {
        ticketsContainer.innerHTML = '<div class="empty-state">Erro ao carregar tickets</div>';
    }
}

// Função para criar novo ticket
async function createTicket(title, description) {
    try {
        const newTicket = await apiRequest(API_BASE_URL, {
            method: 'POST',
            body: JSON.stringify({ title, description })
        });
        
        tickets.push(newTicket);
        renderTickets();
        showAlert('Ticket criado com sucesso!', 'success');
        return newTicket;
    } catch (error) {
        console.error('Erro ao criar ticket:', error);
    }
}

// Função para atualizar status do ticket
async function updateTicketStatus(ticketId, newStatus) {
    try {
        const updatedTicket = await apiRequest(`${API_BASE_URL}/${ticketId}`, {
            method: 'PUT',
            body: JSON.stringify({ status: newStatus })
        });
        
        const index = tickets.findIndex(t => t.id === ticketId);
        if (index !== -1) {
            tickets[index] = updatedTicket;
            renderTickets();
        }
        
        showAlert('Status atualizado com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
    }
}

// Função para deletar ticket
async function deleteTicket(ticketId) {
    if (!confirm('Tem certeza que deseja excluir este ticket?')) {
        return;
    }
    
    try {
        await apiRequest(`${API_BASE_URL}/${ticketId}`, {
            method: 'DELETE'
        });
        
        tickets = tickets.filter(t => t.id !== ticketId);
        renderTickets();
        showAlert('Ticket excluído com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao deletar ticket:', error);
    }
}

// Função para filtrar tickets
function filterTickets() {
    const filterValue = statusFilter.value;
    
    if (filterValue === 'ALL') {
        return tickets;
    }
    
    return tickets.filter(ticket => ticket.status === filterValue);
}

// Função para renderizar tickets
function renderTickets() {
    const filteredTickets = filterTickets();
    
    if (filteredTickets.length === 0) {
        ticketsContainer.innerHTML = '<div class="empty-state">Nenhum ticket encontrado</div>';
        return;
    }
    
    const ticketsHTML = filteredTickets.map(ticket => {
        const statusClass = ticket.status.toLowerCase();
        return `
        <div class="ticket-card" data-id="${ticket.id}">
            <div class="ticket-header">
                <span class="ticket-title">${escapeHtml(ticket.title)}</span>
                <span class="ticket-status status-${statusClass}">
                    ${getStatusLabel(ticket.status)}
                </span>
            </div>
            <div class="ticket-description">${escapeHtml(ticket.description)}</div>
            <div class="ticket-meta">
                <span>Criado em: ${ticket.formattedDate || ticket.createdAt}</span>
                <span>ID: #${ticket.id}</span>
            </div>
            <div class="ticket-actions">
                <select onchange="updateTicketStatus(${ticket.id}, this.value)" ${ticket.status === 'CLOSED' ? 'disabled' : ''}>
                    <option value="OPEN" ${ticket.status === 'OPEN' ? 'selected' : ''}>Aberto</option>
                    <option value="IN_PROGRESS" ${ticket.status === 'IN_PROGRESS' ? 'selected' : ''}>Em Andamento</option>
                    <option value="CLOSED" ${ticket.status === 'CLOSED' ? 'selected' : ''}>Fechado</option>
                </select>
                <button class="btn-danger" onclick="deleteTicket(${ticket.id})">Excluir</button>
            </div>
        </div>
    `}).join('');
    
    ticketsContainer.innerHTML = ticketsHTML;
}

// Função auxiliar para escapar HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Função auxiliar para obter label do status
function getStatusLabel(status) {
    const labels = {
        'OPEN': 'Aberto',
        'IN_PROGRESS': 'Em Andamento',
        'CLOSED': 'Fechado'
    };
    return labels[status] || status;
}

// Event Listeners
ticketForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    
    if (!title || !description) {
        showAlert('Preencha todos os campos', 'error');
        return;
    }
    
    if (title.length < 3 || title.length > 100) {
        showAlert('Título deve ter entre 3 e 100 caracteres', 'error');
        return;
    }
    
    if (description.length < 10 || description.length > 500) {
        showAlert('Descrição deve ter entre 10 e 500 caracteres', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Criando...';
    
    await createTicket(title, description);
    
    ticketForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Criar Ticket';
});

statusFilter.addEventListener('change', renderTickets);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    fetchTickets();
});

// Tornar funções globais para acesso via HTML
window.updateTicketStatus = updateTicketStatus;
window.deleteTicket = deleteTicket;