import { supabase } from './supabase';

export interface UserCredit {
  id: string;
  user_id: string;
  credits: number;
  created_at: string;
  updated_at: string;
}

/**
 * Get user's current credit balance
 */
export async function getUserCredits(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No credits record found, create one with 1 free credit
        await initializeUserCredits(userId);
        return 1;
      }
      throw error;
    }

    return data?.credits || 0;
  } catch (error) {
    console.error('Error getting user credits:', error);
    return 0;
  }
}

/**
 * Initialize credits for a new user
 */
export async function initializeUserCredits(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_credits')
      .insert({
        user_id: userId,
        credits: 1 // Give 1 free credit to new users
      });

    if (error) {
      console.error('Error initializing user credits:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error initializing user credits:', error);
    return false;
  }
}

/**
 * Deduct one credit (atomic operation using database function)
 */
export async function deductCredit(userId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const { data, error } = await supabase
      .rpc('use_credit', { user_id: userId });

    if (error) {
      console.error('Error using credit:', error);
      return { success: false, message: 'Failed to use credit' };
    }

    if (!data) {
      return { success: false, message: 'Insufficient credits' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error using credit:', error);
    return { success: false, message: 'Failed to use credit' };
  }
}

/**
 * Add credits to a user (for future payment integration)
 */
export async function addCredits(userId: string, amount: number): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .rpc('add_credits', { 
        user_id: userId,
        amount: amount 
      });

    if (error) {
      console.error('Error adding credits:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error adding credits:', error);
    return false;
  }
}

/**
 * Check if user has enough credits
 */
export async function hasCredits(userId: string): Promise<boolean> {
  const credits = await getUserCredits(userId);
  return credits > 0;
}