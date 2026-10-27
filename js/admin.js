/**
 * Jannat Safar Kashmir - Admin CRM Management Client Script
 * Handles real-time API communication, lead updates, CSV export, and stats.
 */

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    activeStatus: 'all',
    searchQuery: '',
    bookings: []
  };

  // DOM Elements
  const bookingsTableBody = document.getElementById('bookings-table-body');
  const metricTotal = document.getElementById('metric-total');
  const metricPending = document.getElementById('metric-pending');
  const metricConfirmed = document.getElementById('metric-confirmed');
  const metricRevenue = document.getElementById('metric-revenue');
  const statusTabs = document.querySelectorAll('.status-tab');
  const searchInput = document.getElementById('crm-search-input');
  const newBookingModal = document.getElementById('new-booking-modal');
  const openNewBookingBtn = document.getElementById('open-new-booking-btn');
  const closeNewBookingBtn = document.getElementById('close-new-booking-btn');
  const newBookingForm = document.getElementById('new-booking-form');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const toastWrap = document.getElementById('admin-toast-wrap');

  // =========================================================================
  // Helper Functions
  // =========================================================================

  function showAdminToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'admin-toast';
    toast.textContent = msg;
    toastWrap.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function formatCurrency(amount) {
    return '₹' + Number(amount || 0).toLocaleString();
  }

  // =========================================================================
  // API Calls
  // =========================================================================

  async function fetchStats() {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) {
        metricTotal.textContent = data.stats.totalBookings;
        metricPending.textContent = data.stats.pendingBookings;
        metricConfirmed.textContent = data.stats.confirmedBookings;
        metricRevenue.textContent = formatCurrency(data.stats.totalPipelineValue);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }

  async function fetchBookings() {
    try {
      let url = '/api/bookings?';
      if (state.activeStatus !== 'all') url += `status=${encodeURIComponent(state.activeStatus)}&`;
      if (state.searchQuery) url += `search=${encodeURIComponent(state.searchQuery)}&`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        state.bookings = data.bookings;
        renderBookingsTable();
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  }

  async function updateBookingStatus(id, newStatus) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        showAdminToast(`Updated ${id} status to ${newStatus}`);
        fetchStats();
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while updating status');
    }
  }

  async function deleteBooking(id) {
    if (!confirm(`Are you sure you want to delete lead ${id}?`)) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showAdminToast(`Deleted booking ${id}`);
        fetchBookings();
        fetchStats();
      }
    } catch (err) {
      console.error(err);
    }
  }

  // =========================================================================
  // Render Functions
  // =========================================================================

  function renderBookingsTable() {
    if (!bookingsTableBody) return;

    if (state.bookings.length === 0) {
      bookingsTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 3rem; color: var(--admin-muted);">
            No bookings found matching the current criteria.
          </td>
        </tr>
      `;
      return;
    }

    bookingsTableBody.innerHTML = state.bookings.map(b => {
      const statusClass = b.status.toLowerCase();
      const cleanPhone = (b.phone || '').replace(/[^0-9]/g, '');
      const waMessage = `Hi ${b.name}, thank you for inquiring about ${b.package} with Jannat Safar Kashmir (Ref: ${b.id}). I am Tanzil from the Srinagar office. How can I assist you with your travel dates?`;

      return `
        <tr>
          <td>
            <span class="booking-ref">${b.id}</span>
            <div style="font-size: 0.725rem; color: var(--admin-muted);">
              ${new Date(b.createdAt).toLocaleDateString()}
            </div>
          </td>
          <td>
            <div class="customer-name">${b.name}</div>
            <div class="customer-contact">${b.phone}</div>
            ${b.email ? `<div class="customer-contact" style="font-size: 0.75rem;">${b.email}</div>` : ''}
          </td>
          <td>
            <div style="font-weight: 700; color: var(--admin-primary);">${b.package}</div>
            <div style="font-size: 0.75rem; color: var(--admin-muted);">📅 Date: ${b.travelDate}</div>
            <div style="font-size: 0.75rem; color: var(--admin-muted);">👥 ${b.guests}</div>
          </td>
          <td>
            <div style="font-weight: 800; color: #065f46;">
              ${b.estimatedAmount ? formatCurrency(b.estimatedAmount) : 'Pending Quote'}
            </div>
          </td>
          <td>
            <select class="status-select" data-id="${b.id}">
              <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>⏳ Pending</option>
              <option value="Contacted" ${b.status === 'Contacted' ? 'selected' : ''}>📞 Contacted</option>
              <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>✅ Confirmed</option>
              <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
            </select>
            ${b.notes ? `<div style="font-size: 0.725rem; color: var(--admin-muted); max-width: 180px; margin-top: 0.35rem;" title="${b.notes}">📝 ${b.notes.substring(0, 45)}...</div>` : ''}
          </td>
          <td>
            <div class="action-buttons">
              <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}" target="_blank" class="btn-icon whatsapp" title="Chat on WhatsApp">
                💬
              </a>
              <a href="tel:${b.phone}" class="btn-icon call" title="Call Guest">
                📞
              </a>
              <button class="btn-icon delete" data-id="${b.id}" title="Delete Record">
                🗑
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach event listeners to status selects and delete buttons
    document.querySelectorAll('.status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const val = e.target.value;
        updateBookingStatus(id, val);
      });
    });

    document.querySelectorAll('.btn-icon.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        deleteBooking(id);
      });
    });
  }

  // =========================================================================
  // Export to CSV Function
  // =========================================================================

  function exportToCSV() {
    if (state.bookings.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['Booking ID', 'Date Created', 'Customer Name', 'Phone', 'Email', 'Package', 'Travel Date', 'Guests', 'Status', 'Estimated Amount', 'Notes'];
    const rows = state.bookings.map(b => [
      b.id,
      b.createdAt,
      `"${b.name}"`,
      `"${b.phone}"`,
      `"${b.email || ''}"`,
      `"${b.package}"`,
      b.travelDate,
      `"${b.guests}"`,
      b.status,
      b.estimatedAmount || 0,
      `"${(b.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kashmir_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  // =========================================================================
  // Event Listeners
  // =========================================================================

  statusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      statusTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeStatus = tab.dataset.status;
      fetchBookings();
    });
  });

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = e.target.value.trim();
        fetchBookings();
      }, 300);
    });
  }

  if (openNewBookingBtn && newBookingModal) {
    openNewBookingBtn.addEventListener('click', () => newBookingModal.classList.add('open'));
  }

  if (closeNewBookingBtn && newBookingModal) {
    closeNewBookingBtn.addEventListener('click', () => newBookingModal.classList.remove('open'));
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', exportToCSV);
  }

  if (newBookingForm) {
    newBookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('new-name').value,
        phone: document.getElementById('new-phone').value,
        email: document.getElementById('new-email').value,
        package: document.getElementById('new-package').value,
        travelDate: document.getElementById('new-date').value,
        guests: document.getElementById('new-guests').value,
        estimatedAmount: document.getElementById('new-amount').value,
        notes: document.getElementById('new-notes').value
      };

      try {
        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showAdminToast(`Lead ${data.booking.id} created!`);
          newBookingForm.reset();
          newBookingModal.classList.remove('open');
          fetchBookings();
          fetchStats();
        } else {
          alert(data.error || 'Failed to create lead');
        }
      } catch (err) {
        console.error(err);
        alert('Network error while creating lead');
      }
    });
  }

  // Initial Fetch
  fetchStats();
  fetchBookings();

  // Auto-refresh every 30 seconds for live updates
  setInterval(() => {
    fetchStats();
    fetchBookings();
  }, 30000);
});
