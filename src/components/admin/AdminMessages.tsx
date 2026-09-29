import React, { useState } from 'react';
import { ContactMessage } from '../../types/portfolio.ts';
import { markContactMessageRead, deleteContactMessage } from '../../lib/portfolioService.ts';
import { Mail, MailOpen, Trash2, Reply, Clock, CheckCircle } from 'lucide-react';

interface AdminMessagesProps {
  messages: ContactMessage[];
}

export const AdminMessages: React.FC<AdminMessagesProps> = ({ messages }) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const filteredMessages = messages.filter((m) => {
    if (filter === 'unread') return !m.isRead;
    return true;
  });

  const handleToggleRead = async (message: ContactMessage) => {
    if (!message.id) return;
    try {
      await markContactMessageRead(message.id, !message.isRead);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete message from ${name}?`)) return;
    try {
      await deleteContactMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Contact Inquiries Inbox ({messages.length})
          </h2>
          <p className="text-xs text-zinc-500">
            Messages received through the public portfolio contact form.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filter === 'all' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filter === 'unread' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500'
            }`}
          >
            Unread ({messages.filter(m => !m.isRead).length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Messages List Column */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs divide-y divide-zinc-200 dark:divide-zinc-800">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400">
              No messages found.
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id || msg.createdAt}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.isRead && msg.id) {
                    markContactMessageRead(msg.id, true);
                  }
                }}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedMessage?.id === msg.id
                    ? 'bg-blue-50/60 dark:bg-blue-950/30'
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                } ${!msg.isRead ? 'font-semibold' : ''}`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold">{msg.name}</span>
                  <span className="text-zinc-400 text-[10px] font-mono">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <div className="text-xs text-zinc-700 dark:text-zinc-300 truncate">
                  {msg.subject}
                </div>
                <div className="text-[11px] text-zinc-400 truncate mt-0.5">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Viewer */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {selectedMessage.subject}
                  </h3>
                  <div className="text-xs text-zinc-500 mt-1">
                    From: <strong className="text-zinc-900 dark:text-zinc-100">{selectedMessage.name}</strong> ({selectedMessage.email})
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    Received: {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'N/A'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </a>

                  <button
                    onClick={() => handleToggleRead(selectedMessage)}
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900"
                    title={selectedMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    {selectedMessage.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => selectedMessage.id && handleDelete(selectedMessage.id, selectedMessage.name)}
                    className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-zinc-400">
              Select an inquiry on the left to read its full contents and reply.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
