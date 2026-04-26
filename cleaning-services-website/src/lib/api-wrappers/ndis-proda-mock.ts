/**
 * Modular Mock API Wrapper for NDIS PRODA / PACE (2026 Enterprise Edition)
 * Simulates real-time verification of participant plans and funding eligibility.
 */

export interface NDISParticipant {
  id: string;
  name: string;
  planStatus: 'Active' | 'Pending' | 'Expired';
  availableFunding: number;
  managedBy: 'Agency' | 'Plan Manager' | 'Self';
}

export const NDISApi = {
  verifyParticipant: async (participantId: string): Promise<NDISParticipant | null> => {
    console.log(`[NDIS API] Verifying participant: ${participantId}`);
    
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock response logic
    if (participantId.startsWith('999')) return null; // Simulate not found

    return {
      id: participantId,
      name: 'Simulated Participant Node',
      planStatus: 'Active',
      availableFunding: 15400.50,
      managedBy: 'Plan Manager'
    };
  },

  submitClaim: async (bookingId: string, amount: number) => {
    console.log(`[NDIS API] Submitting claim for booking ${bookingId}: $${amount}`);
    return { success: true, reference: `NDIS-REV-${Math.floor(Math.random() * 1000000)}` };
  }
};
