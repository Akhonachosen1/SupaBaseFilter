# SupaBaseFilter

This project contains a helper for filtering `report_data` using [Supabase](https://supabase.com/).

## Setup

Install dependencies and configure your Supabase credentials:

```bash
npm install @supabase/supabase-js recharts
```

Create a `.env` file with:

```bash
REACT_APP_SUPABASE_URL=your-project-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

Then create the Supabase client in your code:

```javascript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
```

## Usage

```javascript
import { fetchFilteredReports } from './src/filterReports';

// Example filters object
const filters = {
  gender: 'Male',
  age: '21 - 25',
  province: 'Western Cape',
  suburb: 'Khayelitsha',
};

fetchFilteredReports(filters).then(({ data, error }) => {
  if (error) console.error(error);
  else console.log(data);
});
```

The Supabase client is created with environment variables `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`.

## React hook example

A small hook is provided to fetch data when filters change and can be used with charting libraries such as [Recharts](https://recharts.org/):

```javascript
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useFilteredReports } from './src/useFilteredReports';

function ReportsChart({ filters }) {
  const { data, error, loading } = useFilteredReports(filters);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="suburb" />
      <YAxis />
      <Bar dataKey="age" fill="#8884d8" />
    </BarChart>
  );
}
```
