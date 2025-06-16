import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch filtered report data from the `report_data` table.
 *
 * @param {Object} filters - Filter object
 * @param {string} [filters.gender]
 * @param {string} [filters.age] - Range formatted like "21 - 25"
 * @param {string} [filters.province]
 * @param {string} [filters.suburb]
 * @returns {Promise<{ data: any, error: any }>} Result of Supabase query
 */
export async function fetchFilteredReports(filters = {}) {
  let query = supabase.from('report_data').select('*');

  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }

  if (filters.province) {
    query = query.eq('province', filters.province);
  }

  if (filters.suburb) {
    query = query.like('suburb', `%${filters.suburb}%`);
  }

  if (filters.age) {
    const [minAge, maxAge] = filters.age.split("-").map(s => parseInt(s.trim(), 10));
    if (!Number.isNaN(minAge)) {
      query = query.gte('age', minAge);
    }
    if (!Number.isNaN(maxAge)) {
      query = query.lte('age', maxAge);
    }
  }

  const { data, error } = await query;
  return { data, error };
}
