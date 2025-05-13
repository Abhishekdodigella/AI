import React, { useState } from 'react';
import { Ticket as TicketIcon, Plus, Filter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Ticket } from '../types';
import { format } from 'date-fns';

const TicketList: React.FC = () => {
  const { tickets, addTicket, currentUser } = useStore();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTickets = tickets.filter(ticket => 
    statusFilter === 'all' || ticket.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Support Tickets</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={20} />
            New Ticket
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex gap-2">
            {['all', 'open', 'in-progress', 'resolved', 'closed'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  statusFilter === status
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="divide-y">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <TicketIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{ticket.subject}</h3>
                  <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>#{ticket.id.slice(0, 8)}</span>
                    <span>{format(new Date(ticket.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;