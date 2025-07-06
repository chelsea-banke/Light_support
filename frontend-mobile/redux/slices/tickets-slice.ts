import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ticket } from '../interfaces'
import { getTickets } from '../middleware/tickets-middleware'

type TicketsState = {
    tickets: Ticket[]
    loading: boolean
    error: string | null
}

const initialState: TicketsState = {
    tickets: [],
    loading: false,
    error: null,
}

export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action: PayloadAction<Ticket[]>) => {
            state.tickets = action.payload
        },
        addTicket: (state, action: PayloadAction<Ticket>) => {
            state.tickets.push(action.payload)
        },
        updateTicket: (state, action: PayloadAction<Ticket>) => {
            const index = state.tickets.findIndex(f => f.id === action.payload.id)
            if (index !== -1) {
                state.tickets[index] = action.payload
            }
        },
        removeTicket: (state, action: PayloadAction<string>) => {
            state.tickets = state.tickets.filter(f => f.id !== action.payload)
        },
        clearTickets: (state) => {
            state.tickets = []
        },
    },
    // Add extraReducers if you have async thunks for tickets
    extraReducers: (builder) => {
        // Example:
        builder
            .addCase(getTickets.pending, (state) => {
                state.loading = true; state.error = null; 
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.loading = false; state.tickets = action.payload; 
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.loading = false; state.error = action.error.message || 'Failed to fetch tickets'; 
            })
    },
})

export const { setTickets, addTicket, updateTicket, removeTicket, clearTickets } = ticketsSlice.actions
export default ticketsSlice.reducer